// ============================================================
// Galería de eventos: tarjetas -> álbum de fotos (rejilla + lightbox)
// Las fotos se sirven desde Google Drive con los ids de drive_photos.js.
// Si un evento no tiene ids (carpeta nueva), se recurre al iframe de Drive.
// ============================================================
const THUMB_CDN = 'https://lh3.googleusercontent.com/d/';
const SIZES_GRID = '(min-width: 1400px) 12%, (min-width: 992px) 16%, (min-width: 768px) 20%, (min-width: 576px) 25%, 50%';

const albumSection = document.getElementById('albumSection');
const photoPanel = document.getElementById('photoPanel');
const photoGrid = document.getElementById('photoGrid');
const albumTitle = document.getElementById('albumTitle');
const openDrive = document.getElementById('openDrive');
const backButtonPanel = document.getElementById('backButtonPanel');

let carouselInterval = null;
let scrollGuardado = 0;
let albumAbierto = false;

const puedeHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function idsDeEvento(index) {
    const evento = events[index];
    if (typeof drivePhotos === 'undefined' || !drivePhotos[evento.id]) return null;
    return drivePhotos[evento.id].split(',').filter(Boolean);
}

// ---- Carrusel de miniaturas al pasar el ratón (solo dispositivos con ratón) ----
let carouselCard = null;

function startCarousel(card) {
    if (!puedeHover()) return;
    if (carouselCard === card && carouselInterval) return; // ya está girando esta tarjeta
    const index = Number(card.getAttribute('data-index'));
    const images = events[index].additionalImages;
    if (!images || images.length < 2) return;

    const imgElement = card.querySelector('img');
    if (!imgElement.getAttribute('data-original-src')) {
        imgElement.setAttribute('data-original-src', imgElement.src);
    }

    stopCarousel();
    let pos = 0;
    carouselCard = card;
    carouselInterval = setInterval(() => {
        pos = (pos + 1) % images.length;
        imgElement.src = images[pos];
    }, 1000);
}

function stopCarousel() {
    carouselCard = null;
    if (!carouselInterval) return;
    clearInterval(carouselInterval);
    carouselInterval = null;

    document.querySelectorAll('.card img[data-original-src]').forEach(img => {
        img.src = img.getAttribute('data-original-src');
    });
}

// ---- Altura de la cabecera del álbum (para el sticky bajo/a la navbar) ----
let marcoNavHeight = null;

function actualizarNavHeight() {
    if (typeof navbar === 'undefined' || !navbar) return;
    // En móvil la barra superior se desliza fuera de la pantalla al hacer scroll.
    // La cabecera del álbum se pega a su borde inferior mientras está visible y,
    // cuando la barra se oculta, sube al borde superior de la pantalla (sin hueco).
    const rect = navbar.getBoundingClientRect();
    const alto = (rect.height > 0 && rect.bottom > 0) ? rect.bottom : 0;
    document.documentElement.style.setProperty('--nav-h', alto + 'px');
}

function alHacerScroll() {
    if (marcoNavHeight) return;
    marcoNavHeight = requestAnimationFrame(() => {
        marcoNavHeight = null;
        actualizarNavHeight();
    });
}

// ---- Álbum de fotos ----
function openAlbum(index) {
    const ids = idsDeEvento(index);
    if (!ids || ids.length === 0) {
        // Sin ids conocidos: fallback al visor de Drive en iframe.
        // Se restaura el estado de la galería por si el panel estuviera abierto.
        albumSection.classList.remove('hidden');
        photoPanel.classList.add('hidden');
        loadIframe(events[index].id);
        return;
    }

    stopCarousel();
    scrollGuardado = window.scrollY;
    albumAbierto = true;
    actualizarNavHeight();

    albumTitle.textContent = events[index].name;
    openDrive.href = 'https://drive.google.com/drive/folders/' + events[index].id;
    document.title = events[index].name + ' - Galería | Autografia';

    albumSection.classList.add('hidden');
    photoPanel.classList.remove('hidden');
    insertarFotosPorTandas(ids);
    window.scrollTo(0, 0);
}

// Inserta las fotos por tandas para que las peticiones a Google Drive
// se repartan en el tiempo (evita ráfagas que Google pueda limitar con 429).
// El loading="lazy" solo descarga las visibles en cada tanda.
const TAMANO_TANDA = 24;

function insertarFotosPorTandas(ids) {
    photoGrid.replaceChildren();
    let indice = 0;
    function tanda() {
        const fragment = document.createDocumentFragment();
        const fin = Math.min(indice + TAMANO_TANDA, ids.length);
        for (; indice < fin; indice++) {
            const pos = indice;
            const id = ids[pos];
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'photo-item';
            item.setAttribute('aria-label', 'Foto ' + (pos + 1) + ' de ' + ids.length);
            item.innerHTML =
                '<img src="' + THUMB_CDN + id + '=w400"' +
                ' srcset="' + THUMB_CDN + id + '=w400 400w, ' + THUMB_CDN + id + '=w800 800w"' +
                ' sizes="' + SIZES_GRID + '"' +
                ' alt="" loading="lazy" decoding="async">';
            item.addEventListener('click', () => window.PhotoLightbox.open(ids, pos));
            fragment.appendChild(item);
        }
        photoGrid.appendChild(fragment);
        if (indice < ids.length) requestAnimationFrame(tanda);
    }
    tanda();
}

function closeAlbum() {
    if (!albumAbierto) return;
    albumAbierto = false;
    photoPanel.classList.add('hidden');
    albumSection.classList.remove('hidden');
    document.title = 'Galeria de Eventos - Autografia';
    window.scrollTo(0, scrollGuardado);
}

// ---- Tarjetas de eventos ----
function renderGaleria() {
    const eventosContainer = document.getElementById('gallery');
    const fragment = document.createDocumentFragment();

    events.forEach((event, index) => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-2';
        col.innerHTML = `
            <div class="card event-container" data-index="${index}">
                <img src="${event.thumbnail}" class="card-img-top" alt="${event.name}" loading="lazy">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <button class="btn btn-primary load-button bi-camera-fill" type="button">&nbsp;Ver Fotos</button>
                </div>
            </div>
        `;
        fragment.appendChild(col);
    });
    
    eventosContainer.appendChild(fragment);    
}

document.addEventListener('DOMContentLoaded', () => {
    renderGaleria();

    const eventosContainer = document.getElementById('gallery');

    // Clic en una tarjeta (o su botón) -> abrir el álbum
    eventosContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (!card) return;
        openAlbum(Number(card.getAttribute('data-index')));
    });

    // Carrusel de miniaturas al pasar el ratón (solo si hay ratón)
    eventosContainer.addEventListener('mouseenter', (event) => {
        const card = event.target.closest('.card');
        if (card) startCarousel(card);
    }, true);
    eventosContainer.addEventListener('mouseleave', (event) => {
        const card = event.target.closest('.card');
        if (card && !card.contains(event.relatedTarget)) stopCarousel();
    }, true);

    backButtonPanel.addEventListener('click', closeAlbum);

    window.addEventListener('resize', actualizarNavHeight);
    window.addEventListener('scroll', alHacerScroll, { passive: true });
    actualizarNavHeight();

    // Estado inicial: sin iframe
    hideElement(iframe);
    hideElement(iframeContent);
    hideElement(iframeContainer);
});

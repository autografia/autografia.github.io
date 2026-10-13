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

// Estado del carrusel móvil
let mobileCarouselState = new Map(); // card -> { pos, touchTimer, observer }

// Configuración carrusel móvil (ahora SOLO por swipe, sin auto-play)
let prioritizedCard = null;                // Tarjeta con prioridad exclusiva por toque
let priorityTimeout = null;                // Timer para volver a modo normal

const puedeHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function idsDeEvento(index) {
    const evento = events[index];
    if (typeof drivePhotos === 'undefined' || !drivePhotos[evento.id]) return null;
    return drivePhotos[evento.id].split(',').filter(Boolean);
}

// ============================================================
// Carrusel: Swipe (móvil) + Arrastre (desktop) + Click en flechas + Hover (desktop)
// ============================================================
const SWIPE_THRESHOLD = 50;           // px mínimos para considerar swipe/drag
const RESUME_DELAY = 2000;            // ms antes de liberar prioridad tras soltar
const HOVER_DELAY = 300;              // ms antes de activar carrusel por hover
const DRAG_FEEDBACK_FACTOR = 0.15;    // factor de movimiento visual durante arrastre

function startCarousel(card) {
    const index = Number(card.getAttribute('data-index'));
    const images = events[index].additionalImages;
    if (!images || images.length < 2) return;

    const imgElement = card.querySelector('img');
    if (!imgElement.getAttribute('data-original-src')) {
        imgElement.setAttribute('data-original-src', imgElement.src);
    }

    // Si ya hay un carrusel en esta tarjeta, no hacer nada
    if (mobileCarouselState.has(card)) return;

    let pos = 0;
    let startX = null;
    let isDragging = false;
    let hoverTimer = null;
    let isHoverActive = false;

    const cycle = (direction) => {
        // direction: 1 = siguiente, -1 = anterior
        pos = (pos + direction + images.length) % images.length;
        imgElement.src = images[pos];
    };

    const stop = () => {
        imgElement.src = imgElement.getAttribute('data-original-src');
        imgElement.style.transform = '';
        imgElement.style.transition = '';
        // Remover listeners
        card.removeEventListener('pointerdown', onPointerDown);
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerup', onPointerUp);
        card.removeEventListener('pointerleave', onPointerUp);
        card.removeEventListener('pointercancel', onPointerUp);
        card.removeEventListener('mouseenter', onMouseEnter);
        card.removeEventListener('mouseleave', onMouseLeave);
        // Remover click en flechas
        const arrows = card.querySelectorAll('.swipe-arrow');
        arrows.forEach(arrow => arrow.removeEventListener('click', onArrowClick));
        mobileCarouselState.delete(card);
    };

    // Click en flechas (next/prev)
    const onArrowClick = (e) => {
        e.stopPropagation(); // Evitar que se abra el álbum
        const isNext = e.currentTarget.classList.contains('next');
        cycle(isNext ? 1 : -1);
    };

    // Hover en desktop para activar carrusel automático
    const onMouseEnter = () => {
        if (isHoverActive) return;
        hoverTimer = setTimeout(() => {
            isHoverActive = true;
            startHoverCarousel();
        }, HOVER_DELAY);
    };

    const onMouseLeave = () => {
        if (hoverTimer) clearTimeout(hoverTimer);
        if (isHoverActive) {
            isHoverActive = false;
            stopHoverCarousel();
        }
    };

    let hoverInterval = null;
    const startHoverCarousel = () => {
        if (hoverInterval) return;
        hoverInterval = setInterval(() => cycle(1), 1000);
    };
    const stopHoverCarousel = () => {
        if (hoverInterval) clearInterval(hoverInterval);
        hoverInterval = null;
    };

    const onPointerDown = (e) => {
        // Ignorar si el click fue en una flecha (se maneja aparte)
        if (e.target.closest('.swipe-arrow')) return;
        
        // Parar hover carousel si está activo
        if (isHoverActive) {
            stopHoverCarousel();
            isHoverActive = false;
        }
        
        // Ganar prioridad exclusiva
        if (prioritizedCard !== card) {
            mobileCarouselState.forEach((_, otherCard) => {
                if (otherCard !== card) stopCarousel(otherCard);
            });
            prioritizedCard = card;
            if (priorityTimeout) clearTimeout(priorityTimeout);
        }
        startX = e.clientX;
        isDragging = true;
        // Preparar feedback visual
        imgElement.style.transition = 'transform 0.1s ease-out';
        // Capturar puntero para seguir recibiendo eventos aunque salga de la tarjeta
        card.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!isDragging || startX === null) return;
        const delta = e.clientX - startX;
        // Feedback visual: mover imagen ligeramente en dirección del arrastre
        const moveX = delta * DRAG_FEEDBACK_FACTOR;
        imgElement.style.transform = `translateX(${moveX}px)`;
    };

    const onPointerUp = (e) => {
        if (!isDragging || startX === null) return;
        isDragging = false;
        const delta = e.clientX - startX;
        startX = null;
        card.releasePointerCapture(e.pointerId);

        // Restaurar posición con animación suave
        imgElement.style.transition = 'transform 0.2s ease-out';
        imgElement.style.transform = 'translateX(0)';

        if (Math.abs(delta) >= SWIPE_THRESHOLD) {
            // Swipe/drag detectado: avanzar/retroceder
            cycle(delta < 0 ? 1 : -1); // arrastrar izquierda = siguiente
        }
        // Mantener prioridad un tiempo tras soltar
        if (priorityTimeout) clearTimeout(priorityTimeout);
        priorityTimeout = setTimeout(() => {
            prioritizedCard = null;
        }, RESUME_DELAY);
    };

    // Registrar listeners de pointer (funciona para mouse + touch + pen)
    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerup', onPointerUp);
    card.addEventListener('pointerleave', onPointerUp);
    card.addEventListener('pointercancel', onPointerUp);

    // Hover listeners (solo desktop con ratón fino)
    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);

    // Click en flechas
    const arrows = card.querySelectorAll('.swipe-arrow');
    arrows.forEach(arrow => arrow.addEventListener('click', onArrowClick));

    mobileCarouselState.set(card, { pos, stop });
}

// Observer para activar/desactivar carrusel según visibilidad
function initCarouselObserver() {
    if (!('IntersectionObserver' in window)) return; // fallback silencioso

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            if (entry.isIntersecting) {
                startCarousel(card);
            } else {
                stopCarousel(card);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
    });

    // Observar todas las tarjetas actuales y futuras
    document.querySelectorAll('.card[data-index]').forEach(card => observer.observe(card));

    window.__carouselObserver = observer;
}

function stopCarousel(card) {
    const state = mobileCarouselState.get(card);
    if (!state) return;
    state.stop();
    if (prioritizedCard === card) {
        prioritizedCard = null;
        if (priorityTimeout) clearTimeout(priorityTimeout);
    }
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

    // Detener carrusel de la tarjeta clicada
    const card = document.querySelector(`.card[data-index="${index}"]`);
    if (card) stopCarousel(card);
    
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
        const hasAdditional = event.additionalImages && event.additionalImages.length > 0;
        col.innerHTML = `
            <div class="card event-container" data-index="${index}">
                <div class="card-img-wrapper">
                    <img src="${event.thumbnail}" class="card-img-top" alt="${event.name}" loading="lazy">
                    ${hasAdditional ? `
                        <div class="swipe-indicator" aria-hidden="true">
                            <div class="swipe-arrow next"></div>
                            <div class="swipe-dot"></div>
                            <div class="swipe-arrow prev"></div>
                        </div>
                    ` : ''}
                </div>
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

    // Inicializar carrusel (IntersectionObserver) - el hover se gestiona internamente
    initCarouselObserver();

    backButtonPanel.addEventListener('click', closeAlbum);

    window.addEventListener('resize', actualizarNavHeight);
    window.addEventListener('scroll', alHacerScroll, { passive: true });
    actualizarNavHeight();

    // Estado inicial: sin iframe
    hideElement(iframe);
    hideElement(iframeContent);
    hideElement(iframeContainer);
});

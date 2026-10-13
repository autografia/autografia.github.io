// ============================================================
// Lightbox propio (vanilla JS) para las fotos de Google Drive.
// Uso: PhotoLightbox.open(['id1','id2',...], indiceInicial)
// ============================================================
(function () {
    const CDN = 'https://lh3.googleusercontent.com/d/';
    const WIDTH_LIGHTBOX = 'w1600'; // ancho máximo servido por Drive

    let fotos = [];        // ids de Drive del álbum abierto
    let posicion = 0;      // foto actual
    let overlay = null;    // nodo del overlay (se crea una sola vez)
    let imgEl = null;
    let contadorEl = null;
    let cuerpoGuardado = null; // overflow del <body> antes de abrir

    function urlFoto(id, ancho) {
        return CDN + id + '=' + ancho;
    }

    function crearOverlay() {
        overlay = document.createElement('div');
        overlay.id = 'photoLightbox';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Visor de fotos');
        overlay.innerHTML = `
            <button class="lb-btn lb-close bi-x-lg" type="button" aria-label="Cerrar"></button>
            <button class="lb-btn lb-prev bi-chevron-left" type="button" aria-label="Foto anterior"></button>
            <button class="lb-btn lb-next bi-chevron-right" type="button" aria-label="Foto siguiente"></button>
            <button class="lb-btn lb-download bi-download" type="button" aria-label="Descargar foto"></button>
            <img class="lb-img" alt="Foto del álbum">
            <div class="lb-counter" aria-live="polite"></div>
        `;
        document.body.appendChild(overlay);

        imgEl = overlay.querySelector('.lb-img');
        contadorEl = overlay.querySelector('.lb-counter');

        overlay.querySelector('.lb-close').addEventListener('click', cerrar);
        overlay.querySelector('.lb-prev').addEventListener('click', anterior);
        overlay.querySelector('.lb-next').addEventListener('click', siguiente);
        overlay.querySelector('.lb-download').addEventListener('click', descargarFotoActual);

        // Clic fuera de la imagen -> cerrar
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cerrar();
        });

        // Teclado: ← / → / Esc / D (descargar)
        document.addEventListener('keydown', (e) => {
            if (!overlay || !overlay.classList.contains('open')) return;
            if (e.key === 'Escape') { cerrar(); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); anterior(); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); siguiente(); }
            else if (e.key === 'd' || e.key === 'D') { e.preventDefault(); descargarFotoActual(); }
        });

        // Deslizar el dedo en móvil
        let xInicial = null;
        overlay.addEventListener('touchstart', (e) => {
            xInicial = e.changedTouches[0].clientX;
        }, { passive: true });
        overlay.addEventListener('touchend', (e) => {
            if (xInicial === null) return;
            const delta = e.changedTouches[0].clientX - xInicial;
            xInicial = null;
            if (Math.abs(delta) < 50) return; // gesto demasiado corto
            if (delta > 0) anterior(); else siguiente();
        }, { passive: true });

        return overlay;
    }

    function precargar(indice) {
        if (indice < 0 || indice >= fotos.length) return;
        const img = new Image();
        img.src = urlFoto(fotos[indice], WIDTH_LIGHTBOX);
    }

    function mostrar() {
        imgEl.src = urlFoto(fotos[posicion], WIDTH_LIGHTBOX);
        contadorEl.textContent = (posicion + 1) + ' / ' + fotos.length;
        precargar(posicion - 1);
        precargar(posicion + 1);
    }

    function anterior() {
        posicion = (posicion - 1 + fotos.length) % fotos.length;
        mostrar();
    }

    function siguiente() {
        posicion = (posicion + 1) % fotos.length;
        mostrar();
    }

    function descargarFotoActual() {
        if (!fotos.length) return;
        const id = fotos[posicion];
        const url = urlFoto(id, WIDTH_LIGHTBOX);
        
        // Intentar descarga directa via fetch + Blob (funciona si CORS lo permite)
        fetch(url, { mode: 'cors', credentials: 'omit' })
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.blob();
            })
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = `autografia-${id}.jpg`;
                a.rel = 'noopener';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // Liberar URL objeto tras un breve delay para asegurar la descarga
                setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            })
            .catch(() => {
                // Fallback: abrir en nueva pestaña para "Guardar como..."
                const win = window.open(url, '_blank', 'noopener,noreferrer');
                if (win) {
                    win.document.title = `autografia-${id}.jpg`;
                }
            });
    }

    function abrir(ids, indice) {
        if (!ids || ids.length === 0) return;
        fotos = ids;
        posicion = Math.min(Math.max(indice || 0, 0), ids.length - 1);

        if (!overlay) crearOverlay();

        mostrar();

        if (cuerpoGuardado === null) {
            cuerpoGuardado = document.body.style.overflow;
            document.body.style.overflow = 'hidden'; // bloquea el scroll de fondo
        }
        overlay.classList.add('open');
        overlay.querySelector('.lb-close').focus({ preventScroll: true });
    }

    function cerrar() {
        if (!overlay) return;
        overlay.classList.remove('open');
        imgEl.removeAttribute('src');
        if (cuerpoGuardado !== null) {
            document.body.style.overflow = cuerpoGuardado;
            cuerpoGuardado = null;
        }
    }

    window.PhotoLightbox = {
        open: abrir,
        close: cerrar,
        isOpen: () => !!overlay && overlay.classList.contains('open')
    };
})();

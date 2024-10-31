let carouselInterval;
let isCarouselRunning = false; // Estado del carrusel

function startCarousel(card, eventIndex) {
    if (isMobile()) return; // No hace nada si está en móvil

    const images = events[eventIndex].additionalImages;
    if (!images || images.length === 0) return; // Verifica que hay imágenes

    let index = 0;
    const imgElement = card.querySelector("img");

    // Asegúrate de que data-original-src esté configurado correctamente
    if (!imgElement.getAttribute("data-original-src")) {
        imgElement.setAttribute("data-original-src", imgElement.src);
    }

    if (!isCarouselRunning) {
        isCarouselRunning = true; // Cambia el estado a activo
        carouselInterval = setInterval(() => {
            imgElement.src = images[index];
            console.log(`Cambiando a imagen: ${images[index]}`); // Log de depuración
            index = (index + 1) % images.length;
        }, 1000); // Cambia cada segundo    
    }
}

function stopCarousel(card) {
    clearInterval(carouselInterval);
    carouselInterval = null; // Limpia el intervalo
    isCarouselRunning = false; // Cambia el estado a inactivo

    const imgElement = card.querySelector("img");
    const originalSrc = imgElement.getAttribute("data-original-src");

    if (originalSrc) {
        imgElement.src = originalSrc; // Vuelve a la imagen original
    } else {
        console.error("No se encontró el src original para la imagen.");
    }
}

function toggleCarouselMobile(card, eventIndex) {
    if (!isMobile()) return; // No hace nada si no está en móvil

    if (isCarouselRunning) {
        // Si el carrusel está activo, detén el carrusel
        stopCarousel(card);
    } else {
        // Inicia el carrusel
        startCarousel(card, eventIndex);
    }
}

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function backToGallery() {
    document.getElementById('iframeContent').style.display = 'none';
    document.querySelectorAll('.event-container').forEach(container => {
        container.style.display = 'block';
    });
    document.getElementById('navbar').style.display = 'flex';
}

// Eventos para mouseenter y mouseleave
document.getElementById('gallery').addEventListener('mouseenter', (event) => {
    const card = event.target.closest('.card');
    if (card) {
        const eventIndex = card.getAttribute('data-index'); // Asegúrate de tener el índice
        startCarousel(card, eventIndex);
    }
}, true);

document.getElementById('gallery').addEventListener('mouseleave', (event) => {
    const card = event.target.closest('.card');
    if (card) {
        stopCarousel(card);
    }
}, true);

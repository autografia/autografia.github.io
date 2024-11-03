let carouselInterval;
let isCarouselRunning = false; // Estado del carrusel

function startCarousel(card, eventIndex) {
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

document.getElementById('gallery').addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) {
        const eventIndex = card.getAttribute('data-index'); // Asegúrate de tener el índice
        startCarousel(card, eventIndex);
    }
}, true);

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

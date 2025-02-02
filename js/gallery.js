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

// Eventos para mouseenter y mouseleave y click para movil
document.getElementById('gallery').addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) {
        const eventIndex = card.getAttribute('data-index'); // Asegúrate de tener el índice
        startCarousel(card, eventIndex);
    }
}, true);

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


document.addEventListener("DOMContentLoaded", () => {
    const eventosContainer = document.getElementById('gallery');
    const fragment = document.createDocumentFragment();

    // Crear eventos dinámicamente
    events.forEach((event, index) => {
        const col = document.createElement('div');        
        col.className = 'col-6 col-md-4 col-lg-2';
        col.innerHTML = `
            <div class="card event-container" data-index="${index}">
                <img src="${event.thumbnail}" class="card-img-top" alt="${event.name}">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <button class="btn btn-primary load-button bi-camera-fill">&nbsp;Ver Fotos</button>
                </div> 
            </div>
        `;
        fragment.appendChild(col);
    });
    
    eventosContainer.appendChild(fragment);    
    eventosContainer.addEventListener('click', handleGalleryClick);
    eventosContainer.addEventListener('mouseenter', handleGalleryMouseEnter, true);
    eventosContainer.addEventListener('mouseleave', handleGalleryMouseLeave, true);
    hideElement(iframe);
    hideElement(iframeContent);
    hideElement(iframeContainer);
});


// Manejo de eventos en la galería
function handleGalleryClick(event) {
    const card = event.target.closest('.card');
    if (card) {
        const index = card.getAttribute('data-index');
        if (event.target.classList.contains('load-button')) {
            loadIframe(events[index].id);
        }
    }
}

function handleGalleryMouseEnter(event) {
    const card = event.target.closest('.card');
    if (card) {
        const index = card.getAttribute('data-index');
        startCarousel(card, index);
    }
}

function handleGalleryMouseLeave(event) {
    const card = event.target.closest('.card');
    if (card) {
        stopCarousel(card);
    }
}
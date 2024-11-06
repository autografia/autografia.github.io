const navbar = document.getElementById('navbar');
const iframeContent = document.getElementById('iframeContent');
const iframeContainer = document.getElementById('iframeContainer');
const iframe = document.getElementById('iframe');
const gallery = document.getElementById('gallery');
const loadingSpinner = document.getElementById('loadingSpinner');

// Funciones auxiliares para mostrar y ocultar
function showElement(element) {
    element.classList.remove('hidden');
}
function hideElement(element) {
    element.classList.add('hidden');
}

// Función de ocultar el iframe y mostrar galería
function hideIframe() {
    hideElement(iframeContent);
    hideElement(iframeContainer);
    if (window.innerWidth <= 768) {
        navbar.classList.remove('hidden');
    }
    gallery.classList.remove('hidden');
    document.querySelectorAll('.event-container').forEach(container => {
        container.classList.remove('hidden');
    });
}

// Función de cargar el iframe
function loadIframe(folderID) {
    iframe.src = `https://drive.google.com/embeddedfolderview?id=${folderID}#grid`;
    showElement(iframe);
    showElement(iframeContent);
    showElement(iframeContainer);
    showElement(loadingSpinner);

    document.querySelectorAll('.event-container').forEach(container => {
        container.classList.add('hidden');
    });
    if (window.innerWidth <= 768) {
        navbar.classList.add('hidden');
    }
    gallery.classList.add('hidden');
    
    // Ocultar spinner al cargar iframe
    iframe.onload = () => {
        loadingSpinner.classList.add('hidden');
        iframe.style.opacity = 1;
    };
}

// Datos de los eventos
const events = [
    {
        id: '18jhjvxDmQPz950v4wpaghI78Zfl3DHUt',
        name: 'Moralet 2024',
        thumbnail: '../fotos/moralet2023/baja_calidad/DSC_4809.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1l4r7ORtNdcgr1y09Mmvgm-vB6EyR_Le0',
        name: 'Volrace 2022',
        thumbnail: '../fotos/volrace_gt_2022/baja_calidad/DSC_3043.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1R_rfHmNFxYJ0ILO9EQ2WZV8lcttpQBor',
        name: 'Turron 2023',
        thumbnail: '../fotos/concentración_turron/baja_calidad/DSC_3169.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '16nXnrLSontaTuWYg-cEnGd-NCQjkCeoy',
        name: 'Parole 2023',
        thumbnail: '../fotos/moralet2023/baja_calidad/DSC_4946.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1VqhChzPFuS4EsTKncIkJu3SFyB2T5bqG',
        name: 'Campello 2023',
        thumbnail: '../fotos/campello_enero_2023/baja_calidad/DSC_3314-min.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1iuSsfUbP75EQMDuHuDHsz8pZ7kl0eJhA',
        name: 'Agost 2023',
        thumbnail: '../logos/icono.png',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1eUs2dO60oXEemto1lutxIWps_qs9JEca',
        name: 'Moralet 2022 entrada',
        thumbnail: '../fotos/moralet2023/baja_calidad/DSC_4911.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1mfRnLZcKk7-I45zEFySJTL2lZ24cch1x',
        name: 'Moralet 2022 normales',
        thumbnail: '../fotos/moralet2023/baja_calidad/DSC_4863.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1N8d3ekIVEBwqahrkDUrskilyWCyK1j4F',
        name: 'R5 Bimotor',
        thumbnail: '../fotos/moralet2023/baja_calidad/DSC_4863.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    },
    {
        id: '1VjWYrdKy_FZEZcRjfwqprrhEQcYlAwM4',
        name: 'Moralet 2023',
        thumbnail: '../fotos/moralet2023/baja_calidad/DSC_4946.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    }
];

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

document.addEventListener("DOMContentLoaded", () => {
    const eventosContainer = document.getElementById('gallery');
    const fragment = document.createDocumentFragment();

    // Crear eventos dinámicamente
    events.forEach((event, index) => {
        const col = document.createElement('div');        
        col.className = 'col-6 col-md-4 col-lg-2'; // 2 columnas en móvil, 3 en tablets, 5-6 en pantalla grande
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
    // Delegación de eventos para toda la galería
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

// Función de ocultar el iframe y mostrar galería
function hideIframe() {
    hideElement(iframeContent);
    hideElement(iframeContainer);
    navbar.classList.remove('hidden');
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
    navbar.classList.add('hidden');
    gallery.classList.add('hidden');
    
    // Ocultar spinner al cargar iframe
    iframe.onload = () => {
        loadingSpinner.classList.add('hidden');
        iframe.style.opacity = 1;
    };
}

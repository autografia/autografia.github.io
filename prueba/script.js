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
        id: '1VjWYrdKy_FZEZcRjfwqprrhEQcYlAwM4',
        name: 'Moralet 2023',
        thumbnail: '../fotos/moralet2023/baja_calidad/DSC_4946.webp',
        additionalImages: ['../fotos/moralet2023/baja_calidad/DSC_4947.webp', '../fotos/moralet2023/baja_calidad/DSC_4948.webp', '../fotos/moralet2023/baja_calidad/DSC_4950.webp']
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const eventosContainer = document.getElementById('eventosContainer');

    events.forEach((event, index) => {
        const eventHTML = `
            <div class="col-md-3 mb-3 event-container">
                <div class="card" 
                     onmouseenter="startCarousel(this, ${index})" 
                     onmouseleave="stopCarousel(this)" 
                     onclick="toggleCarouselMobile(this, ${index})">
                    <img src="${event.thumbnail}" data-original-src="${event.thumbnail}" class="card-img-top" alt="${event.name}">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <button class="load-button" onclick="loadIframe('${event.id}')">
                            <i class="fas fa-camera"></i> Ver Fotos
                        </button>
                    </div>
                </div>
            </div>
        `;
        eventosContainer.innerHTML += eventHTML;
    });
});

let carouselInterval;

function startCarousel(card, eventIndex) {
    if (isMobile()) return; // No hace nada si está en móvil

    const images = events[eventIndex].additionalImages;
    if (images.length === 0) return;

    let index = 0;
    const imgElement = card.querySelector("img");

    carouselInterval = setInterval(() => {
        imgElement.src = images[index];
        index = (index + 1) % images.length;
    }, 1000); // Cambia cada segundo
}

function stopCarousel(card) {
    clearInterval(carouselInterval);
    const imgElement = card.querySelector("img");
    imgElement.src = imgElement.getAttribute("data-original-src");
}

function toggleCarouselMobile(card, eventIndex) {
    if (!isMobile()) return; // No hace nada si no está en móvil

    if (carouselInterval) {
        // Si el carrusel está activo, detén el carrusel
        stopCarousel(card);
        carouselInterval = null;
    } else {
        // Inicia el carrusel
        startCarousel(card, eventIndex);
    }
}

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}



// Función para cargar el iframe
function loadIframe(folderID) {
    const iframeContent = document.getElementById('iframeContent');
    const iframe = document.getElementById('iframe');
    const loadingSpinner = document.getElementById('loadingSpinner');

    loadingSpinner.style.display = 'block';
    iframe.style.display = 'none';

    iframe.src = `https://drive.google.com/embeddedfolderview?id=${folderID}#grid`;

    iframe.onload = () => {
        loadingSpinner.style.display = 'none';
        iframe.style.display = 'block';

        if (window.innerWidth < 768) {
            document.getElementById('navbar').style.display = 'none';
        }
    };

    iframeContent.style.display = 'block';
    document.querySelectorAll('.event-container').forEach(container => {
        container.style.display = 'none';
    });
}

// Volver a la galería
function backToGallery() {
    document.getElementById('iframeContent').style.display = 'none';
    document.querySelectorAll('.event-container').forEach(container => {
        container.style.display = 'block';
    });
    document.getElementById('navbar').style.display = 'flex';
}

// Cambiar tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    const themeIcon = document.getElementById('themeToggle').querySelector('.theme-icon');
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
}

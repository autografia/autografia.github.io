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
    const fragment = document.createDocumentFragment();

    events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'col-md-3 col-sm-6 event-container';
        eventCard.innerHTML = `
            <div class="card" 
                 data-index="${index}">
                <img src="${event.thumbnail}" class="card-img-top" alt="${event.name}">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <button class="load-button">
                        <i class="fas fa-camera"></i> Ver Fotos
                    </button>
                </div>
            </div>
        `;
        fragment.appendChild(eventCard);
    });

    eventosContainer.appendChild(fragment);

    // Delegar eventos
    eventosContainer.addEventListener('mouseenter', (event) => {
        if (event.target.closest('.card')) {
            const index = event.target.closest('.card').getAttribute('data-index');
            startCarousel(event.target.closest('.card'), index);
        }
    }, true);

    eventosContainer.addEventListener('mouseleave', (event) => {
        if (event.target.closest('.card')) {
            stopCarousel(event.target.closest('.card'));
        }
    }, true);

    eventosContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (card) {
            const index = card.getAttribute('data-index');
            toggleCarouselMobile(card, index);
            if (event.target.classList.contains('load-button')) {
                loadIframe(events[index].id);
            }
        }
    });
});

function loadIframe(folderID) {
    const iframeContent = document.getElementById('iframeContent');
    const iframe = document.getElementById('iframe');
    const loadingSpinner = document.getElementById('loadingSpinner');

    loadingSpinner.style.display = 'block';
    iframe.style.display = 'none';
    iframe.style.opacity = 0; // Iniciar en opacidad 0
    iframe.src = `https://drive.google.com/embeddedfolderview?id=${folderID}#grid`;

    iframe.onload = () => {
        loadingSpinner.style.display = 'none';
        iframe.style.display = 'block';

        // Efecto de desvanecimiento
        iframe.style.transition = 'opacity 0.5s ease'; // Agregar transición
        setTimeout(() => {
            iframe.style.opacity = 1;
        }, 100);

        if (window.innerWidth < 768) {
            document.getElementById('navbar').style.display = 'none';
        }
    };

    iframeContent.style.display = 'block';
    document.querySelectorAll('.event-container').forEach(container => {
        container.style.display = 'none';
    });
}
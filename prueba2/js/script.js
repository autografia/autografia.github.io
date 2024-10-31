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

document.addEventListener("DOMContentLoaded", () => {
    const eventosContainer = document.getElementById('gallery');
    const fragment = document.createDocumentFragment();

    const gallery = document.getElementById('gallery');

    events.forEach((event, index) => {
        const col = document.createElement('div');        
        col.className = 'col-6 col-md-4 col-lg-2'; // 2 columnas en móvil, 3 en tablets, 5-6 en pantalla grande
        col.innerHTML = `
        <div class="card event-container" data-index="${index}">
            <img src="${event.thumbnail}" class="card-img-top" alt="${event.name}">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <button class="btn btn-primary load-button" onclick="loadIframe('${event.id}')">Ver Fotos</button>
            </div> 
        </div>
        `;
        gallery.appendChild(col);
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
    const iframe = document.getElementById('iframe');
    iframe.src = folderID;
    document.getElementById('iframeContainer').style.display = 'block';
    document.getElementById('loadingSpinner').style.display = 'block';
    
    // Ocultar eventos
    document.querySelectorAll('.event-container').forEach(container => {
        container.style.display = 'none';
    });
    //Ocultar NavBar
    document.getElementById('navbar').style.display = 'none';
    
    iframe.src = `https://drive.google.com/embeddedfolderview?id=${folderID}#grid`;

    // Al cargar el iframe, ocultar el spinner de carga
    iframe.onload = () => {
        gallery.style.display = 'none';
        iframe.style.display = 'flex';
        document.getElementById('loadingSpinner').style.display = 'none';
        // Efecto de desvanecimiento
        iframe.style.transition = 'opacity 0.5s ease'; // Agregar transición
        setTimeout(() => {
            iframe.style.opacity = 1;
        }, 100);
    };    
}
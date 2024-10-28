// Datos de los eventos
const events = [
    {
        id: '18jhjvxDmQPz950v4wpaghI78Zfl3DHUt',
        name: 'Moralet 2024',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '1l4r7ORtNdcgr1y09Mmvgm-vB6EyR_Le0',
        name: 'Volrace 2022',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '1R_rfHmNFxYJ0ILO9EQ2WZV8lcttpQBor',
        name: 'Turron 2023',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '16nXnrLSontaTuWYg-cEnGd-NCQjkCeoy',
        name: 'Parole 2023',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '1VqhChzPFuS4EsTKncIkJu3SFyB2T5bqG',
        name: 'Campello 2023',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '1iuSsfUbP75EQMDuHuDHsz8pZ7kl0eJhA',
        name: 'Agost 2023',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '1eUs2dO60oXEemto1lutxIWps_qs9JEca',
        name: 'Moralet 2022 entrada',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '1mfRnLZcKk7-I45zEFySJTL2lZ24cch1x',
        name: 'Moralet 2022 normales',
        thumbnail: '../logos/icono.png'
    },
    {
        id: '1VjWYrdKy_FZEZcRjfwqprrhEQcYlAwM4',
        name: 'Moralet 2023',
        thumbnail: '../logos/icono.png'
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const eventosContainer = document.getElementById('eventosContainer');

    // Generador de eventos
    events.forEach((event) => {
        const eventHTML = `
            <div class="col-md-4 mb-4 event-container">
                <div class="card">
                    <img src="${event.thumbnail}" class="card-img-top" alt="${event.name}">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <button class="load-button" onclick="loadIframe('${event.id}')"><i class="fas fa-camera"></i> Ver Fotos</button>
                    </div>
                </div>
            </div>
        `;
        eventosContainer.innerHTML += eventHTML;
    });
});

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

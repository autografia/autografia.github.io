function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');

        const themeIcon = document.getElementById('themeToggle').querySelector('.theme-icon');
        themeIcon.classList.remove('bi-moon-stars-fill');
        themeIcon.classList.add('bi-sun-fill');
        
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');

        const themeIcon = document.getElementById('themeToggle').querySelector('.theme-icon');
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-stars-fill');
    }
}

function applyPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
        if (!document.body.classList.contains('dark-theme')) {
            toggleTheme();
        }
    } else {
        if (!document.body.classList.contains('light-theme')) {
            toggleTheme();
        }
    }
}

applyPreferredTheme();

// ---- Menú móvil: al abrir, el logo se cambia por el simplificado
//      (logo_simple.png, más compacto) y se restaura al cerrar.
//      El cambio se hace con un pequeño fundido (no brusco). ----
(function () {
    const logo = document.querySelector('.navbar-brand .logo');
    const navCollapse = document.getElementById('navbarNav');
    if (!logo || !navCollapse) return;

    const logoSrc = logo.getAttribute('src');
    const logoSimple = logoSrc.replace(/logo\.png$/i, 'logo_simple.png');
    if (logoSimple === logoSrc) return; // no se puede derivar: no tocar

    let logoTimer = null;

    function cambiarLogo(aSimple) {
        const nuevo = aSimple ? logoSimple : logoSrc;
        // El ancho del logo se ajusta YA (clase CSS): evita que el logo grande
        // (222px) siga ocupando sitio mientras se funde y el menú salte de altura.
        const nav = document.getElementById('navbar');
        if (nav) nav.classList.toggle('menu-abierto', aSimple);
        clearTimeout(logoTimer);
        if (logo.getAttribute('src') === nuevo) {
            logo.classList.remove('logo-cambiando'); // seguro ante clics rápidos
            return;
        }
        logo.classList.add('logo-cambiando');           // se desvanece
        logoTimer = setTimeout(() => {
            logo.src = nuevo;                            // se intercambia
            requestAnimationFrame(() => requestAnimationFrame(() => {
                logo.classList.remove('logo-cambiando'); // reaparece
            }));
        }, 160);
    }

    navCollapse.addEventListener('show.bs.collapse', () => cambiarLogo(true));
    navCollapse.addEventListener('hide.bs.collapse', () => cambiarLogo(false));
})();
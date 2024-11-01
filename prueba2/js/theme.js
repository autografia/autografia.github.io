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
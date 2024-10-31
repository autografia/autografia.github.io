function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    const themeIcon = document.getElementById('themeToggle').querySelector('.theme-icon');
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
}
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const beforeImage = document.querySelector('.slider-image-before img');
    const afterImage = document.querySelector('.slider-image-after');
    const handle = document.querySelector('.slider-handle');

    let isDragging = false;

    handle.addEventListener('mousedown', function () {
        isDragging = true;
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        const sliderRect = slider.getBoundingClientRect();
        let offsetX = e.clientX - sliderRect.left;
        offsetX = Math.max(0, Math.min(offsetX, sliderRect.width));
        handle.style.left = offsetX + 'px';
        afterImage.style.clip = `rect(0, ${offsetX}px, 100%, 0)`;
    });
});
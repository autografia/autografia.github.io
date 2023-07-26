window.onload = function () {
  setTimeout(function () {
    document.getElementById("fadein").remove();
  }, 1000);
};

$(window).on('load', function () {
  $("#loader-wrapper").fadeOut(700);
});


const randomBar = document.getElementById("random-bar");
const cantidadImagenes = 28;
const fondos = [];
// Generar los nombres de las imágenes automáticamente
for (let i = 1; i <= cantidadImagenes; i++) {
  fondos.push(`hr/hr_${i}.png`);
}

const randomImage = fondos[Math.floor(Math.random() * fondos.length)];
randomBar.style.backgroundImage = `url(${randomImage})`;




//De aqui para abajo es el lazy loading para que no tarde en cargar

// Función para cargar la imagen en segundo plano y asignar la propiedad src
const loadImage = (image) => {
  const src = image.dataset.highres;
  const img = new Image();
  img.src = src;
  img.onload = () => {
    image.src = src;
  };
};

// Función para verificar si la imagen está en la pantalla
const isInView = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
/*
// Selecciona todas las imágenes de la galería
const galleryImages = document.getElementsByClassName('photo')[0].getElementsByTagName('img');

// Carga las imágenes en segundo plano a medida que se muestran en pantalla
window.addEventListener('scroll', () => {
  galleryImages.forEach(image => {
    if (isInView(image) && !image.src) {
      loadImage(image);
    }
  });
});
*/
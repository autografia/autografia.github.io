window.onload = function () {
  setTimeout(function () {
    document.getElementById("fadein").remove();
  }, 1000);
};

$(window).on('load', function () {
  $("#loader-wrapper").fadeOut(700);
});

/*const randomBar = document.getElementById("random-bar");
const fondos = ["hr/hr_1.png","hr/hr_2.png","hr/hr_3.png", "hr/hr_4.png", "hr/hr_5.png", "hr/hr_6.png", "hr/hr_7.png", "hr/hr_8.png", "hr/hr_9.png", "hr/hr_10.png","hr/hr_11.png", "hr/hr_12.png", "hr/hr_13.png", "hr/hr_14.png", "hr/hr_15.png", "hr/hr_16.png", "hr/hr_17.png", "hr/hr_18.png", "hr/hr_19.png", "hr/hr_20.png", "hr/hr_21.png", "hr/hr_22.png", "hr/hr_23.png", "hr/hr_24.png", "hr/hr_25.png", "hr/hr_26.png", "hr/hr_27.png", "hr/hr_28.png"];

const randomImage = fondos[Math.floor(Math.random() * fondos.length)];*/

const randomBar = document.getElementById("random-bar");
const cantidadImagenes = 28;
const fondos = [];

// Generar los nombres de las imágenes automáticamente
for (let i = 1; i <= cantidadImagenes; i++) {
  fondos.push(`hr/hr_${i}.png`);
}

const randomImage = fondos[Math.floor(Math.random() * fondos.length)];

//console.log(randomImage)

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

// Carga las imágenes en segundo plano a medida que se muestran en pantalla
window.addEventListener('scroll', () => {
  galleryImages.forEach(image => {
    if (isInView(image) && !image.src) {
      loadImage(image);
    }
  });
});
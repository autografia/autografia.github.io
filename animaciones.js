 
		  	  
// Selecciona todas las imágenes de la galería
const galleryImages = document.querySelectorAll('.photo img');

// Selecciona la ventana emergente, la imagen dentro de ella y el botón de descarga
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content');
const modalDownloadButton = document.querySelector('.modal .download-button');

// Agrega un evento de clic a cada imagen
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    // Muestra la ventana emergente y establece la imagen seleccionada como su fuente
    modal.style.display = 'block';
    modalImg.src = image.dataset.highres;
    
    // Establece la URL de descarga del botón de descarga
    modalDownloadButton.href = image.dataset.highres;
  });
});

// Agrega un evento de clic al botón de cerrar la ventana emergente
const closeBtn = document.querySelector('.close');
if(closeBtn){
  closeBtn.addEventListener('click', () => {
    // Oculta la ventana emergente al hacer clic en el botón de cerrar
    modal.style.display = 'none';
  });
}
// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.querySelectorAll(".photo img");
var captionText = document.querySelector(".caption");

// Loop through all images and add the click event listener
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function() {
    modal.style.display = "block";
    modalImg.src = this.dataset.highres;
    modalDownloadButton.href = this.dataset.highres;
    captionText.innerHTML = this.alt;
  });
}

// Agrega el evento de clic al botón de descarga
modalDownloadButton.addEventListener('click', () => {
  // Descarga la imagen seleccionada
  window.location.href = modalDownloadButton.href;
});

// Agrega el evento de clic a la ventana emergente para cerrarla al hacer clic fuera de ella
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});














const randomBar = document.getElementById("random-bar");
const fondos = ["hr/hr_1.png","hr/hr_2.png","hr/hr_3.png", "hr/hr_4.png", "hr/hr_5.png", "hr/hr_6.png", "hr/hr_7.png", "hr/hr_8.png", "hr/hr_9.png", "hr/hr_10.png","hr/hr_11.png", "hr/hr_12.png", "hr/hr_13.png", "hr/hr_14.png", "hr/hr_15.png", "hr/hr_16.png", "hr/hr_17.png", "hr/hr_18.png", "hr/hr_19.png", "hr/hr_20.png", "hr/hr_21.png", "hr/hr_22.png", "hr/hr_23.png", "hr/hr_24.png", "hr/hr_25.png", "hr/hr_26.png", "hr/hr_27.png", "hr/hr_28.png"];

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

// Carga las imágenes en segundo plano a medida que se muestran en pantalla
window.addEventListener('scroll', () => {
  galleryImages.forEach(image => {
    if (isInView(image) && !image.src) {
      loadImage(image);
    }
  });
});

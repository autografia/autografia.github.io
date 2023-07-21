const laFuncionQueSea = () => {
  // Selecciona todas las imágenes de la galería
  const galleryImages = document.getElementsByClassName('photo')[0].getElementsByTagName('img');
    // Selecciona la ventana emergente, la imagen dentro de ella y el botón de descarga
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-content');
  const modalDownloadButton = document.querySelector('#download-button');
  const modalDownloadOriginalButton = document.querySelector('#download-button2');

  // Agrega un evento de clic al botón de cerrar la ventana emergente
  const closeBtn = document.getElementsByClassName('close')[0];
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var images = document.querySelectorAll(".photo img");
  var captionText = document.querySelector(".caption");


    // Agrega el evento de clic al botón de descarga
  modalDownloadButton.addEventListener('click', () => {
    window.location.href = modalDownloadButton.href;
  });

  // Agrega el evento de clic al botón de descarga de calidad original
  modalDownloadOriginalButton.addEventListener('click', () => {
    // Descarga la imagen en calidad original
    window.location.href = modalDownloadOriginalButton.href;
  });
  
  // Agrega un evento de clic a cada imagen
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function() {
      modal.style.display = "block";
      modalImg.src = this.dataset.highres;
      modalDownloadButton.download = this.alt;
      modalDownloadButton.href = this.dataset.highres;
      modalDownloadOriginalButton.href = this.dataset.highres.replace("alta_calidad", "calidad_original");
      modalDownloadOriginalButton.href = this.dataset.highres.replace("webp", "jpg");
      captionText.innerHTML = this.alt;
    });
  } 
}

fetch('/fotos/moralet_2023/fotos.json')
.then(response => response.json())
.then(data => {
  const galeria = document.getElementById('galeria');

  data.forEach(foto => {
    const div = document.createElement('div');
    div.classList.add('photo');

    const img = document.createElement('img');
    img.src = foto.baja_calidad;
    img.dataset.highres = foto.alta_calidad;
    img.alt = foto.nombre;
    img.onerror = imgError; // Agrega esta línea para asignar la función imgError al evento onerror

    div.appendChild(img);
    galeria.appendChild(div);
    laFuncionQueSea()
  });
})
.catch(error => {
  console.error('Error al cargar el archivo JSON:', error);
});

// Agrega la función imgError
function imgError() {
  this.onerror = "";
  this.src = "/logos/error404.gif";
  return true;
}


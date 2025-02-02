// Función para manejar errores de imagen
const imgError = (image) => {
  image.onerror = "";
  image.src = "/logos/error404.gif";
  return true;
};

// Función para cargar fotos desde un JSON y agregarlas a una galería
const cargarFotos = (json, galeria) => {
  return fetch(json)
    .then(response => response.json())
    .then(data => {
      data.forEach(foto => {
        const div = document.createElement('div');
        div.classList.add('photo');

        const img = document.createElement('img');
        img.src = foto.baja_calidad; // Solo se carga la imagen de baja calidad inicialmente
        img.dataset.highres = foto.alta_calidad.replace("-min.webp", ".webp"); // Almacenamos la URL de alta calidad sin el "-min"
        img.alt = foto.nombre;
        img.onerror = () => imgError(img);

        div.appendChild(img);
        galeria.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error);
    });
};

// Función para configurar la funcionalidad de la ventana modal y los botones de descarga
const configurarModal = () => {
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.imagen');
  const modalDownloadButton = document.querySelector('#download-button');
  const modalDownloadOriginalButton = document.querySelector('#download-button2');
  const closeBtn = document.querySelector('.close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  modalDownloadButton.addEventListener('click', () => {
    window.location.href = modalDownloadButton.href;
  });

  modalDownloadOriginalButton.addEventListener('click', () => {
    window.location.href = modalDownloadOriginalButton.href;
  });

  const acordeones = document.querySelectorAll('.accordion-item');

  acordeones.forEach(acordeon => {
    acordeon.addEventListener('click', () => {
      const images = acordeon.querySelectorAll(".photo img");
      const captionText = acordeon.querySelector(".caption");

      images.forEach((img) => {
        img.addEventListener("click", function () {
          modal.style.display = "block";

          // Cargar la versión de alta calidad al hacer clic en la imagen
          modalImg.src = this.dataset.highres; // Cambiamos la fuente de la imagen a la URL de alta calidad
          modalDownloadButton.download = this.alt;
          modalDownloadButton.href = this.dataset.highres;

          const altaCalidadLink = this.dataset.highres;
          const calidadOriginalLink = altaCalidadLink.replace("-min.webp", ".webp"); // Reemplazamos "-min.webp" por ".webp" para obtener el enlace de alta calidad
          const jpgLink = calidadOriginalLink.replace(".webp", ".jpg");
          modalDownloadOriginalButton.href = jpgLink;

          captionText.innerHTML = this.alt;
        });
      });
    });
  });
};


// Llamada a la función para cargar fotos
const json1 = 'https://autografia.github.io/fotos/campello_enero_2023/fotos.json';
const galeria1 = document.querySelectorAll(".galeria")[0];
const json2 = 'https://autografia.github.io/fotos/concentración_turron/fotos.json';
const galeria2 = document.querySelectorAll(".galeria")[1];
const json3 = 'https://autografia.github.io/fotos/volrace_gt_2022/fotos.json';
const galeria3 = document.querySelectorAll(".galeria")[2];
const json4 = 'https://autografia.github.io/fotos/sanjuan2023/fotos.json';
const galeria4 = document.querySelectorAll(".galeria")[3];

cargarFotos(json1, galeria1).then(configurarModal);
cargarFotos(json2, galeria2).then(configurarModal);
cargarFotos(json3, galeria3).then(configurarModal);
cargarFotos(json4, galeria4).then(configurarModal);

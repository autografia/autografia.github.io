const laFuncionQueSea = () => {
    // Selecciona la ventana emergente, la imagen dentro de ella y el botón de descarga
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.imagen');
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
  
  let indexSelected = 0
  // Agrega un evento de clic a cada imagen
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function() {
      indexSelected = i
      modal.style.display = "block";
      modalImg.src = images[indexSelected].highres;
      modalDownloadButton.download = this.alt;
      modalDownloadButton.href = this.dataset.highres;

      // Obtenemos el enlace con alta calidad del dataset
      const altaCalidadLink = this.dataset.highres;      
      // Reemplazamos "alta_calidad" por "calidad_original"
      const calidadOriginalLink = altaCalidadLink.replace("alta_calidad", "calidad_original");      

      const arrow = document.createElement('div', { class: 'arrow' })
      arrow.innerHTML = '>'
      arrow.onclick = () => indexSelected++

      const imageContainer = document.querySelector('.modal-content.imagen')
      imageContainer.appendChild(arrow)
      // Reemplazamos ".webp" por ".jpg"
      const jpgLink = calidadOriginalLink.replace(".webp", ".jpg");      
      modalDownloadOriginalButton.href = jpgLink;
      
      captionText.innerHTML = this.alt;
    });
  }   
}

// Obtiene el nombre del archivo HTML actual
const currentFileName = window.location.pathname.split('/').pop();
// Remueve la extensión .html del nombre del archivo actual
var fileNameWithoutExtension = currentFileName.replace('.html', '');
if(fileNameWithoutExtension===''){
  fileNameWithoutExtension='index'
}


if (fileNameWithoutExtension === 'index') {
    json = '/fotos/campello_enero_2023/fotos.json';
    const galeria = document.querySelectorAll(".galeria");
    fetch(json)
    .then(response => response.json())
    .then(data => {    
    
      data.forEach(foto => {
        const div = document.createElement('div');
        div.classList.add('photo');
    
        const img = document.createElement('img');
        img.src = foto.baja_calidad;
        img.dataset.highres = foto.alta_calidad;
        img.alt = foto.nombre;
        img.onerror = imgError; // Agrega esta línea para asignar la función imgError al evento onerror
    
        div.appendChild(img);
        galeria[0].appendChild(div);
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

    //Primer acordeon
    json = '/fotos/concentración_turron/fotos.json';
      fetch(json)
      .then(response => response.json())
      .then(data => {    
      
        data.forEach(foto => {
          const div = document.createElement('div');
          div.classList.add('photo');
      
          const img = document.createElement('img');
          img.src = foto.baja_calidad;
          img.dataset.highres = foto.alta_calidad;
          img.alt = foto.nombre;
          img.onerror = imgError; // Agrega esta línea para asignar la función imgError al evento onerror
      
          div.appendChild(img);
          galeria[1].appendChild(div);
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

    //Segundo Acordeon  
    json = '/fotos/volrace_gt_2022/fotos.json';
      fetch(json)
      .then(response => response.json())
      .then(data => {    
      
        data.forEach(foto => {
          const div = document.createElement('div');
          div.classList.add('photo');
      
          const img = document.createElement('img');
          img.src = foto.baja_calidad;
          img.dataset.highres = foto.alta_calidad;
          img.alt = foto.nombre;
          img.onerror = imgError; // Agrega esta línea para asignar la función imgError al evento onerror
      
          div.appendChild(img);
          galeria[2].appendChild(div);
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

      //Tercer Acordeon          
    json = '/fotos/sanjuan2023/fotos.json';
    fetch(json)
    .then(response => response.json())
    .then(data => {    
    
      data.forEach(foto => {
        const div = document.createElement('div');
        div.classList.add('photo');
    
        const img = document.createElement('img');
        img.src = foto.baja_calidad;
        img.dataset.highres = foto.alta_calidad;
        img.alt = foto.nombre;
        img.onerror = imgError; // Agrega esta línea para asignar la función imgError al evento onerror
    
        div.appendChild(img);
        galeria[3].appendChild(div);
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
} else {   
  // Si no coincide con ninguna opción, maneja el caso por defecto aquí.  
  json = '/fotos/'+fileNameWithoutExtension+'/fotos.json';
  if(fileNameWithoutExtension === 'moralet2023'){
    // Si no coincide con ninguna opción, maneja el caso por defecto aquí.  
    json = '/fotos/moralet2023/fotos.json';
  }    
    const galeria = document.querySelector("#galeria");
    fetch(json)
    .then(response => response.json())
    .then(data => {    

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
}

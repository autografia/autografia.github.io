const launchButton = document.getElementById('launch');
      const imagesContainer = document.getElementById('images');
      const imagenes = document.querySelectorAll('#images img');

      launchButton.addEventListener('mouseenter', () => {
        // Restablecer la animación
        imagesContainer.style.opacity = 0;
        imagenes.forEach((imagen) => {
          imagen.style.transform = 'scale(0)';
        });

        // Aplicar la animación
        imagesContainer.style.opacity = 1;
        imagenes[0].style.transform = 'scale(1)';
        imagenes[1].style.transform = 'scale(1)';
        imagenes[2].style.transform = 'scale(1)';
        imagenes[3].style.transform = 'scale(1)';
      });

      // Restablecer la animación cuando se sale del hover
      launchButton.addEventListener('mouseleave', () => {
        imagesContainer.style.opacity = 0;
        imagenes.forEach((imagen) => {
          imagen.style.transform = 'scale(0)';
        });
      });

      // Restablecer la animación después de que termine la animación
      imagenes[0].addEventListener('transitionend', () => {
        imagesContainer.style.opacity = 0;
        imagenes.forEach((imagen) => {
          imagen.style.transform = 'scale(0)';
        });
      });
	  
	  
	  
	  
	  
	  
	  
	
	// Selecciona todas las imágenes de la galería
	const galleryImages = document.querySelectorAll('.photo img');

	// Selecciona la ventana emergente y la imagen dentro de ella
	const modal = document.querySelector('.modal');
	const modalImg = document.querySelector('.modal-content');

	// Agrega un evento de clic a cada imagen
	galleryImages.forEach(image => {
	  image.addEventListener('click', () => {
		// Muestra la ventana emergente y establece la imagen seleccionada como su fuente
		modal.style.display = 'block';
		modalImg.src = image.dataset.highres;
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
		//captionText.innerHTML = this.alt;
	  });
	}

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	if(span){
		// When the user clicks on <span> (x), close the modal
		span.addEventListener("click", function() {
		  modal.style.display = "none";
		});
	}











const randomBar = document.getElementById("random-bar");
const fondos = ["hr/hr_1.png","hr/hr_2.png","hr/hr_3.png", "hr/hr_4.png", "hr/hr_5.png", "hr/hr_6.png", "hr/hr_7.png", "hr/hr_8.png", "hr/hr_9.png", "hr/hr_10.png","hr/hr_11.png", "hr/hr_12.png", "hr/hr_13.png", "hr/hr_14.png", "hr/hr_15.png", "hr/hr_16.png", "hr/hr_17.png", "hr/hr_18.png", "hr/hr_19.png", "hr/hr_20.png", "hr/hr_21.png", "hr/hr_22.png", "hr/hr_23.png", "hr/hr_24.png", "hr/hr_25.png", "hr/hr_26.png", "hr/hr_27.png", "hr/hr_28.png"];

const randomImage = fondos[Math.floor(Math.random() * fondos.length)];
randomBar.style.backgroundImage = `url(${randomImage})`;
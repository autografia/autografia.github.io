

function generarCards(idDiv) {


}


// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Agregar evento clic a los botones de los acordeones
    const buttons = document.querySelectorAll(".accordion-button");
    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        // Generar las cards para el acordeón correspondiente (index + 1)
        generarCards(`accordion-body-${index + 1}`);
      });
    });
  });
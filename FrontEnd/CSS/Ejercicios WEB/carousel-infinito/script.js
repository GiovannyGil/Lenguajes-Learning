document.addEventListener("DOMContentLoaded", function() {
    const slideTrack = document.querySelector(".slide-track");
    const slides = document.querySelectorAll(".slide");

    // Clonar las imágenes para crear el efecto infinito
    slides.forEach(function(slide) {
        const cloneSlide = slide.cloneNode(true);
        slideTrack.appendChild(cloneSlide);
        // slideTrack.appfirstChild(slide.cloneNode(true));
    });

    // Animación del carrusel
    let position = 0;
    const slideWidth = slides[0].offsetWidth;

    function moveSlides() {
        position -= slideWidth;
        slideTrack.style.transition = "transform 0.5s ease-in-out";
        slideTrack.style.transform = "translateX(" + position + "px)";

        // Cuando todas las imágenes originales se hayan desplazado fuera del carrusel, resetear la posición
        if (position <= -slideWidth * slides.length) {
            setTimeout(function() {
                position = 0;
                slideTrack.style.transition = "none";
                slideTrack.style.transform = "translateX(" + position + "px)";
            }, 500);
        }
    }

    setInterval(moveSlides, 3000); // Intervalo de cambio de imágenes (ajustar según sea necesario)
});


// realizar la funcion para el carrusel pero para la derecha, y que las imagenes clonadas no se agregen al final, si no al inicio, para dar el efecto de carrusel infinito

// funcion carrusel infinito hacia la derecha
document.addEventListener("DOMContentLoaded", function() {
    const slideTrackD = document.querySelector(".slide-trackD");
    const slidesD = document.querySelectorAll(".slideD");
    const totalSlides = slidesD.length;
    const slideWidthD = slidesD[0].offsetWidth;

    // Clonar las imágenes para crear el efecto infinito
    const clonedSlides = [];
    for (let i = 0; i < totalSlides; i++) {
        const cloneSlide = slidesD[i].cloneNode(true);
        clonedSlides.unshift(cloneSlide); // Agregar el clon al inicio del array
    }

    // Agregar los clones al principio del carrusel
    clonedSlides.forEach(function(slide) {
        slideTrackD.insertBefore(slide, slideTrackD.firstChild);
    });

    // Iniciar en la posición correcta para que la imagen 7 sea visible
    let positionD = -slideWidthD * (totalSlides - 1);

    // Mover el carrusel a la posición inicial
    slideTrackD.style.transition = "none";
    slideTrackD.style.transform = "translateX(" + positionD + "px)"

    function moveSlidesD() {
        // Mover las imágenes hacia la derecha
        positionD -= slideWidthD; 
        slideTrackD.style.transition = "transform 0.5s ease-in-out";
        slideTrackD.style.transform = "translateX(" + positionD + "px)";

        // Cuando la última imagen original se haya desplazado fuera del carrusel, resetear la posición
        if (Math.abs(positionD) >= slideWidthD * totalSlides) {
            setTimeout(function() {
                positionD = -slideWidthD * (totalSlides - 1);
                slideTrackD.style.transition = "none";
                slideTrackD.style.transform = "translateX(" + positionD + "px)";
            }, 500);
        }
    }

    setInterval(moveSlidesD, 3000); // Intervalo de cambio de imágenes (ajustar según sea necesario)
});

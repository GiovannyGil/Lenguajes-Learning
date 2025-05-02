// acceder a la galeria
const galeria = document.getElementById('galeria')

const carrusel = (direccion) => {
    // manejo del carrusel -> vijilar las imegens del slide, si estan, entran o salen
    const opciones = {
        root: document.querySelector('.galeria__carousel'),
        rootMargin: '0px', // sin margenes al rededor de la galeria__carrusel (contenedor)
        threshold: 0.9, // porcentaje para considerar que la imgen esta dentro del contenedor (90% en este caso)
    }

    // obtener todos los elementos del carrusel que se estan observando
    const observer = new IntersectionObserver((entradas) => {
        // detectar los slide visibles
        const slidesvisibles = entradas.filter((entrada) => {
            // conocer con un condicional, si todos los elementos son visibles o no
            if(entrada.isIntersecting === true){
                return entrada // solo mostrar las entradas/elementos que son visibles
            }
        })

        // direccion atras o adelante
        if(direccion === 'atras'){
            // obtener el primer slide visible
            const primerSlideVisible = slidesvisibles[0]
            // conocer su index
            const indexPrimerSlideVisible = entradas.indexOf(primerSlideVisible)

            // si el index del primer slide visible es mayor a 0, entonces
            if(indexPrimerSlideVisible >= 1){
                // acceder al slide anterior, y atrastraer para ponerlo en el ultimo pues/elemento/lugar
                entradas[indexPrimerSlideVisible - 1].target.scrollIntoView(
                    {
                        behavior: 'smooth',
                        inline: 'start'
                }) // atrastraer el slide anterior, hacer un scroll suave (animacion)
            }
        } else if (direccion === 'adelante'){
            // obtener el ultimo slide visible
            const ultimoSlideVisible = slidesvisibles[slidesvisibles.length - 1]
            // conocer su index
            const indexUltimoSlideVisible = entradas.indexOf(ultimoSlideVisible)

            // si el index del ultimo slide visible es mayor a 0, entonces
            if(entradas.length - 1 > indexUltimoSlideVisible){
                // acceder al siguiente slide, y atrastraer para ponerlo en el primer pues/elemento/lugar
                entradas[indexUltimoSlideVisible + 1].target.scrollIntoView(
                    {
                        behavior: 'smooth',
                        inline: 'start'
                }) // atrastraer el slide siguiente, hacer un scroll suave (animacion)
            }
        }

        
        // despues dejar de observar el slide, para evitar alguna iteracion infinita
        const slides = galeria.querySelectorAll('.galeria__carousel-slide')
        slides.forEach((slide) => {
            // observar cada uno de los slides
            observer.unobserve(slide) // dejar de observar el slide
        })
    }, opciones)

    const slides = galeria.querySelectorAll('.galeria__carousel-slide')
        slides.forEach((slide) => {
            // observar cada uno de los slides
            observer.observe(slide) // observar el slide
        })
}


export default carrusel
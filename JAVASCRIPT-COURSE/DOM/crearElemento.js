const agregarCaja = ()=>{
    /**
     * crear elemento
     * createElement
     * recibe como parámetro en texto la etiqueta que se quiere crear
     */
    const nuevaCaja = document.createElement('div')
    /**
     * agregar el texto y atributos
     * 
     */
    nuevaCaja.innerText = 'nueva Caja'
    //nuevaCaja.setAttribute('id', 'nuevo-id')
    nuevaCaja.setAttribute('class', 'caja activa')

    /**
     * agregar el elemento al DOM
     * 
     */
    const contenedor = document.getElementById('contenedor1')

    /**
     * appendchild() -agrega elemento al final del contenedor al final
     * 
     * insertAdjancentElement:
     *  - afterbegin agregar el elemento como primer
     *  - beforebegin por fuera del elemento padre
     *  - beforend como ultimo elemento
     *  - afterend despues del elemento padre
     *  contenedor.innertAdjacentElement('afterbegin',nuevaCaja)
     * 
     * replaceWith
     * permite reemplazar un elemento por otro
     * document.queryselector('contenedor1 .caja').replaceWith(nuevaCaja)
     */
    contenedor.appendChild(nuevaCaja)
}
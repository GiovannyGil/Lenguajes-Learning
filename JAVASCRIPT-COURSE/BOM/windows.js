/**
 * window.open
 * permite abrir ventanas del navegador (puede pedir permisos)
 *  
 * 1: direcion de la ventana === url
 * 2: nombre de la ventana
 * 3: cadena de texto de opciones 
 * 
 * devuelve un objeto para acceder a la ventana
 * 
 */


let ventana
abrirVentana =  ()=>{
    ventana = window.open('','ventana','width=500,height=500')
    ventana.document.write('<h1>Nueva Ventana</h1>')
}
cerrarVentana =()=>{
    ventana.close()
}


/**
 * screen object
 * 
 * Representa la pantalla del usuario / monitor
 */

console.log('Ancho de pantalla', window.screen.width)
console.log('Alto de pantalla', window.screen.height)
console.log('Ancho de pantalla sin barra de windows', window.screen.availWidth)
console.log('Ancho de pantalla sin barra de windows', window.screen.availHeight)

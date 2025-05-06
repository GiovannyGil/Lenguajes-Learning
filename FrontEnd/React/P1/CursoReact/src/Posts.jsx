// ejemplo de como consumir una API

import { VscBug,VscDebugStart } from "react-icons/vsc";


export function Posts() {
  return (
    <button onClick={()=> {
        fetch('https://jsonplaceholder.typicode.com/posts') // solicitar datos
            .then(response => response.json()) // recibir lo datos en una respuesta y convertirlos en un json
            .then(data => console.log(data)) // mpstrar por consola
            .catch(error => console.error(error)) // si ocurre un error, mostrarlo por consola
    }}>  
    {/* usar el icono bug, de la importacion de icons */}
    <VscBug/> 
     Trear Datos
     <VscDebugStart/>
     </button>
  );
}

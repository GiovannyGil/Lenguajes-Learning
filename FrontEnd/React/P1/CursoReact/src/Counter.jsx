import {useState} from "react";

export function Counter() {
    const [counter, setCounter] = useState(100) // iniciar la constante en 0
    const [mensaje, setMensaje] = useState('')
    return (
      
      <div>
        <div>
        <h1>Counter: {counter}</h1>
        <button onClick={()=>{ // cuando haga click en el boton, hacer lo siguiente
          // counter = counter+10
          setCounter(counter+1) // actualizar la contante +1 con cada click
        }}>Sumar</button>
        <button onClick={()=>{
          setCounter(counter-1) // actualizar la contante -1 con cada click
        }}>Restar</button>
        <button onClick={()=>{
          setCounter(100) // actualizar la contante al valor predefinido
        }}>Reiniciar</button>
        </div>
        <div>
          {/* obtener lo que se ingrese por el input con el change y la funcion */}
          <input onChange={e => setMensaje(e.target.value)}/> 
          <button onClick={()=>{
            alert('El Mensaje es este: ' + mensaje) 
            //mostrar el mensaje ingresado en el input en un alert al dar click
          }}>SAVE</button>
        </div>
      </div>
    );
  }
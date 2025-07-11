import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Buscar from './components/buscarNombre'
import ListarPokemons from './components/listaPokemons'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {
      /* <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */
      }
      <div className="card">
        {/* buscar pokemon por nombre */}
        <Buscar />
        {/* lista de los pokemoenes en un slide ->  */}
        <ListarPokemons />

        <p>
          Archivo Principal <code>src/App.tsx</code> aquí inicia todo
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

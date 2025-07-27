import './App.css'
import React, { useEffect, useState } from 'react';
import ent from './json/entidades.json';
import ListaEntidades from './components/listaEntidades';

function App() {
  // declarar variables globales el componentes
  return (
    <>
      <ListaEntidades entidades={ent.entities} />
    </>
  )
}

export default App

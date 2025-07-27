import React from 'react'
import '../styles/listaEntidades.css'

interface Entidad {
  id: number;
  name: string;
  description: string;
  state: string;
  antique: string;
  typeEntity: string;
  type: {
    types: string[];
  };
}

const ListaEntidades: React.FC<{ entidades: Entidad[] }> = ({ entidades }) => {
  return (
    <section className="main-section">
      <h1>Gestión de Entidades</h1>
      <div className="table-container">
        <table className="entidades-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Tipos</th>
              <th>Antigüedad</th>
              <th>Estado</th>
              <th>Tipo de Entidad</th>
            </tr>
          </thead>
          <tbody>
            {entidades.map((entidad) => (
              <tr key={entidad.id}>
                <td>{entidad.name}</td>
                <td>{entidad.description}</td>
                <td>
                  {entidad.type.types.map((tipo, idx) => (
                    <span key={idx} className="tipo-chip">{tipo}</span>
                  ))}
                </td>
                <td>{entidad.antique}</td>
                <td>
                  <span className={`estado ${entidad.state === 'active' ? 'activo' : 'inactivo'}`}>
                    {entidad.state}
                  </span>
                </td>
                <td>{entidad.typeEntity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ListaEntidades;

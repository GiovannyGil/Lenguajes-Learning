import './task.css'


export function TaskCard({ready}) {
//   const CardStyles = { background: "#202020", color: "#fff", padding: "20px" };
//   const titleStyles = { fontWeight: "lighter" };

  return (
    <div className='card'>
      <h1>Mi Primer Tarea</h1>
      <span className={ready ? 'bg-green' : 'bg-red'}
      >{ready ? "Tarea Realizada" : "Tarea Pendiente"}</span>
    </div>
  );
}

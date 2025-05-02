import { useNavigate } from 'react-router-dom'


export function TaskCard({ task }) {

  const navigate = useNavigate()

  return (
    <div className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:coursor-pointer'
    onClick={()=>{ // al dar click en el div de la tarea, lleve a un form para editar, actualizar y eliminar
      navigate(`/tasks/${task.id}`)//   lo mismo en ambos casos
      // navigate('/tasks/' + task.id)
    }}
    >
      <h1 className='font-bold uppercase'>{task.title}</h1>
      <p className='text-slate-400'>{task.description}</p>
    </div>
  );
}

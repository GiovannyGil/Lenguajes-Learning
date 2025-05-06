import { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { createTaks, deleteTask, updateTask, getTask } from '../api/task.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'


export function TaskFormPage() {
  const { register, handleSubmit, formState:{errors}, setValue
   } = useForm();
  const navigate = useNavigate()
  const params = useParams()
  // console.log(params)

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    if (params.id) { // si hay un id es porque está actualizando
      // console.log('actualizando')

      await updateTask(params.id, data)
      toast.success('Tarea Actualizada', {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      }) // añadir una notificacion al actualizar una tarea

    }   else { // si no hay id, es porque va a crear
      await createTaks(data);
      toast.success('Tarea Creada', {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      }) // añadir una notificacion al crear una tarea
    }
    navigate('/tasks') 
  });


  // ver los datos en los campos cuando se queire actualizar
  useEffect(() => {
    async function loadTask(){
      if (params.id) {
        // console.log('opteniendo datos')
        const {data} = await getTask(params.id);
        setValue('title', data.title)
        setValue('description', data.description)
        // console.log(res);
      }
    }
    loadTask();
  }, [])

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit} className=''>
        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
        />
        {/* muestra error en caso de que haya en el campo titulo */}
        {errors.title && <span>Este campo es requerido</span>}
        <textarea  className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea> 
        {/* muestra error en caso de que haya en el campo descripcion */}
        {errors.description && <span>Este campo es requerido</span>}
        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
      </form>


      {params.id && ( // si hay un id en la ruta, muestra este boton, porque esta editando o eliminando
      <div className='flex justify-end'>
        <button className='bg-red-500 p-3 rounded-lg w-48 mt-3'
        onClick={async ()=> {
          const accepted = window.confirm('está seguro') // ventana confirmación
          if (accepted){ // si acepta
            await deleteTask(params.id) // eliminar
            toast.success('Tarea Eliminada', {
              position: "bottom-right",
              style: {
                background: "#101010",
                color: "#fff"
              }
            }) // añadir una notificacion al crear una tarea
            navigate("/tasks")
          }
        }}>Delete</button>
      </div>
      )}
    </div>
  );
}

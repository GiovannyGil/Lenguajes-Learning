import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { TasksPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import {Navegation} from './components/Navegation'
import { Toaster } from 'react-hot-toast'



function App() {
  return (
    // navegador de router / buscador
    <BrowserRouter>
    {/* rutas  */}
     <div className='container mx-auto'>
      <Navegation />
        <Routes>
          {/* dirigir automaticamente a tasks */}
          <Route path='/' element={ <Navigate to="/tasks"/>} /> 
          {/* ruta de tasks */}
          <Route path='/tasks' element={<TasksPage />} /> 
          {/* ruta de tasks form / formulario para crear tareas */}
          <Route path='/tasks-create' element={<TaskFormPage />} /> 
          <Route path='/tasks/:id' element={<TaskFormPage />}/> {/* aqui irá un valor dinamico, id que cambia */}

        </Routes>
        <Toaster/>
     </div>
    </BrowserRouter>
  )
}
 
export default App
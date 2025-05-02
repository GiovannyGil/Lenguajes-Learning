import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FilterType, todoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  // todolist -> una señal que va a emitir un array de tipo (todoModel) con 3 elementos
  todolist = signal<todoModel[]>([
    { id: 1, title: 'Learn Angular', completed: false, editing: false, },
    { id: 2, title: 'Learn React', completed: false, editing: false, },
    { id: 3, title: 'Learn Vue', completed: false, editing: false, },
  ])

  // filer -> una señal que va a emitir un string de tipo (FilterType)
  filter = signal<FilterType>('all') // all -> por defecto

  // Señal Computada => es una señal que depende de otras señales

  todoListFiltered = computed(() => {
    const filter = this.filter()
    const todos = this.todolist()

    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed) // retornara las tareas completadas
      case 'active':
        return todos.filter((todo) => !todo.completed) // retornara las tareas no completadas
      default:
        return todos // all -> retornara todas las tareas
    }
  })


  // newtodo -> nueva tarea, capturar el valor pasado por el inpur
  newTodo = new FormControl('', {
    nonNullable: true, // no puede ser nulo
    validators: [Validators.required, Validators.minLength(3)] // validaciones
  })

  // establecer el metodo constructor
  constructor() {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this.todolist())) // guardar las tareas en el localstorage
    })
  }

  // establecer el ngOnInit
  ngOnInit(): void {
    const storage = localStorage.getItem('todos') // obtener las tareas del localstorage

    if(storage){
      this.todolist.set(JSON.parse(storage)) // si hay tareas, establecerlas
    }
  }

  // metodo que recibe el filter y lo cambia por el seleccionado (botones de filtro)
  changeFilter(filterString: FilterType){
    this.filter.set(filterString)
  }

  // metodo para agregar una nueva tarea
  addTodo(){
    // capturar el valor del input y quitar los espacios
    const newTodoTitle = this.newTodo.value.trim()
    // si el valor no es nulo
    if(this.newTodo.valid && newTodoTitle !== ''){
      this.todolist.update((prev_todos) => {
        // agregar un nuevo elemento al array de tareas
        return [...prev_todos,
          {
            id: Date.now(),
            title: newTodoTitle,
            completed: false,
          }
        ]
      })
      // limpiar el input
      this.newTodo.reset()
    } else {
      // si el valor es nulo, mostrar un mensaje
      alert('Por favor, ingrese una tarea válida.')
      // limpiar el input
      this.newTodo.reset()
    }
  }

  // metodo para marcar una tarea como completada
  toggleTodo(todoID: number){
    return this.todolist.update((prev_todos) => prev_todos.map((todo) => {
      // si el id de la tarea es igual al id de la tarea seleccionada
      if(todo.id === todoID){
        return {...todo, completed: !todo.completed} // cambiar el estado de la tarea
      }
      return {...todo} // si no se cumple la condición, retornar el mismo elemento
    }))
  }

  // metodo para eliminar una tarea
  removeTodo(todoID: number){
    return this.todolist.update((prev_todos) => prev_todos.filter((todo) => todo.id !== todoID))
    // filtrar el array de tareas y retornar todas las tareas que no sean igual al id de la tarea seleccionada
  }

  // metodo para editar una tarea
  updateTodoEditingMode(todoID: number) {
    return this.todolist.update((prev_todos) =>
      prev_todos.map((todo) => {
        return todo.id === todoID ? {...todo, editing: true}: {...todo, editing: false}
        // si el id de la tarea es igual al id de la tarea seleccionada, mostrar el input para editar
      }
      )
    )
  }

  // metodo para guardar el titulo de la tarea editada
  saveTitleTodo(todoID: number, event: Event){
    const title = (event.target as HTMLInputElement).value
    this.todolist.update((prev_todos) =>
      prev_todos.map((todo) => {
        return todo.id === todoID ? {...todo, title, editing : false} : {...todo}
        // si el id de la tarea es igual al id de la tarea seleccionada, guardar el titulo editado
      })
    )
  }
}

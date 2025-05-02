import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private localStorageKey = 'listaTareas';

  // método para obtener las tareas del localStorage
  getTareas():string[] {
    // Si no hay tareas, devolvemos un array vacío, si hay tareas, las devolvemos
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
  }

  // método para agregar una tarea al localStorage
  agregarTarea(tarea: string) {
    // Obtenemos las tareas actuales
    const tareas = this.getTareas();
    // Agregamos la nueva tarea
    tareas.push(tarea);
    // Guardamos las tareas en el localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }

  // método para eliminar una tarea del localStorage
  eliminarTarea(index: number) {
    // Obtenemos las tareas actuales
    const tareas = this.getTareas();
    // Eliminamos la tarea
    tareas.splice(index, 1);
    // Guardamos las tareas en el localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }

}

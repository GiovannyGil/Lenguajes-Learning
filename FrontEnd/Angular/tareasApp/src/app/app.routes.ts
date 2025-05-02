import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
  // crear la primera ruta
  {path: 'todo', component: TodoComponent},
  // setear la ruta por defecto
  {path: '**', pathMatch: 'full', redirectTo: 'todo'}
];

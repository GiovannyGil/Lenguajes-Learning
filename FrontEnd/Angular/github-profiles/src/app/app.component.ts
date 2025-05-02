import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import {FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'github-profiles';
  user: any = null; // Propiedad para almacenar los datos del usuario
  repos: any[] = []; // Propiedad para almacenar los repositorios
  error: string = ''; // Propiedad para almacenar mensajes de error
  username: string = ''; // Propiedad para almacenar el nombre de usuario


  constructor(private apiService: ApiService) {} // Inyectamos el servicio ApiService en el constructor


}

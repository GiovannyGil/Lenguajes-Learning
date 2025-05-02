import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { map } from 'rxjs/operators'; // Importa el operador 'map'
import { catchError } from 'rxjs/operators'; // Importa el operador 'catchError'
import { throwError } from 'rxjs'; // Importa la función 'throwError'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // iniciar el servicio de API / HttpClient
  private http = inject(HttpClient);
  private url:string = 'https://api.github.com/users/'


  // metodo para obtener el perfil de un usuario
  getProfile(username: string): Observable<Profile> {
    // retornar el perfil del usuario con el username especificado -> Observable<Profile>
    return this.http.get<Profile>(this.url + username);
  }

  // metodo para obtener los repositorios de un usuario
  getRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + username + '/repos?sort=created').pipe(
      map(response => response || []), // Si la respuesta es null o undefined, devolvemos un array vacío
      catchError(error => {
        console.error('Error fetching repositories:', error);
        return throwError('Problem fetching repositories');
      })
    );
  }


}

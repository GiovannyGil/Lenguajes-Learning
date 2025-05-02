import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // inyectar HttpClient
  // constructor(private http: HttpClient) { }
  constructor() { }
  private http = inject(HttpClient);
  // direcion de la API -> Backend
  private url = 'https://localhost:7236/api/Transaccions';

  // metodo para optener todos los registros -> GET
  getAllTransacciones(): Observable<Transaccion[]> {
    try {
      const transacciones = this.http.get<Transaccion[]>(this.url);
      console.log(transacciones);
      return transacciones
    } catch (error) {
      console.log(error);
      return throwError(error);
    }
  }

  // metodo para optener un registro por ID -> GET
  getTransaccionById(id: number): Observable<Transaccion> {
    try {
      const transaccion = this.http.get<Transaccion>(`${this.url}/${id}`);
      return transaccion;
    } catch (error) {
      console.log(error);
      return throwError(error);
    }
  }

  // metodo para crear un registro -> POST
  createTransaccion(transaccion: Transaccion): Observable<Transaccion> {
    try {
      const nuevaTransacicon = this.http.post<Transaccion>(this.url, transaccion);
      return nuevaTransacicon;
    } catch (error) {
      console.log(error);
      return throwError(error);
    }
  }

  // metodo para actualizar un registro -> PUT/PATCH
  updateTransaccion(id: number, transaccion: Transaccion): Observable<Transaccion> {
    try {
      // verificar si el registro por id existe
      const transaccionExistente = this.http.get<Transaccion>(`${this.url}/${id}`);
      // si no existe retornar un error
      if (!transaccionExistente) {
        return throwError('Transaccion no encontrada');
      }
      // si existe actualizar el registro
      const transaccionActualizada = this.http.put<Transaccion>(`${this.url}/${id}`, transaccion);
      return transaccionActualizada;

    } catch (error) {
      console.log(error);
      return throwError(error);
    }
  }

  // metodo para eliminar un registro -> DELETE
  deleteTransaccion(id: number): Observable<Transaccion> {
    try {
      const transaccionEliminada = this.http.delete<Transaccion>(`${this.url}/${id}`);
      return transaccionEliminada;
    } catch (error) {
      console.log(error);
      return throwError(error);
    }
  }

}

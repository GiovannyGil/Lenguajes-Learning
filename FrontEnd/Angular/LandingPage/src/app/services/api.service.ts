import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // injecting the service HttpClient
  private _hhtp = inject(HttpClient);
  // define the url base of the API
  private urlBase: string = 'https://fakestoreapi.com/products'

  // call the API/services

  // method to get all products
  getProducts(): Observable<IProduct[]> {
    // return the response of the API
    return this._hhtp.get<IProduct[]>(this.urlBase);
  }

  // method to get a product by id
  getProductById(id: number): Observable<IProduct> {
    // return the response of the API
    return this._hhtp.get<IProduct>(`${this.urlBase}/${id}`);
  }
}

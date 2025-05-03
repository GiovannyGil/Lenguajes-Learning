import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http'
// import 'rxjs/operator/map';
// import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  httpOptions: any

  constructor(private _http: HttpClient) { }

  /*AlertMsm ==> Función que consume API (Servicio OPA) en su respectivo método */
  
  ApiSendData(url, Params) {
    if(localStorage.getItem("Auth")!=undefined){
      this.httpOptions = {
      headers: new HttpHeaders({
          'authorization': localStorage.getItem("Auth")
      })
    };
  }else{
    this.httpOptions = { }
  }
    let _url = url
    let _Params = Params
    return this._http.post(_url, _Params, this.httpOptions)
  }

  ApiGetData(url) {
    if(localStorage.getItem("Auth")!=undefined){
      this.httpOptions = {
      headers: new HttpHeaders({
          'authorization': localStorage.getItem("Auth")
      })
    };
  }else{
    this.httpOptions = { }
  }
    let _url = url
    return this._http.get(_url, this.httpOptions)
  }

  
  ApiBlob(url, Params) {
    if(localStorage.getItem("Auth")!=undefined){
      this.httpOptions = {
      headers: new HttpHeaders({
          'authorization': localStorage.getItem("Auth")
      }),
      responseType: "blob"
    };
  }else{
    this.httpOptions = {  responseType: "blob" }
  }
    let _url = url
    let _Params = Params
    return this._http.post(_url, _Params, this.httpOptions)
  }

  ApiSendDataImoney(url, Params) {
    this.httpOptions = {
    headers: new HttpHeaders({
        'Authorization': "Bearer " + Params.token
    })
  };

  let _url = url
  let _Params = Params
  return this._http.post(_url, _Params.parametrostranopa , this.httpOptions)
}
}

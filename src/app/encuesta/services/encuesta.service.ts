import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http: HttpClient ) { }


  create(encuesta: any, id:string) {
    return this.http.put(`${ base_url }/encuestas/create/${id}`, encuesta )
  }

}

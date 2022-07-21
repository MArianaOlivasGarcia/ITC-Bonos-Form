import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router ) { }


  get token(): string {
    return localStorage.getItem('accessToken') || '';
  }

  validarToken(): Observable<any> {

    return this.http.get(`${ base_url }/alumnos/renovar` ).pipe(
      tap( (resp: any) => {
 
        localStorage.setItem('accessToken', resp.accessToken );
        const { _id, control,
                nombre,
                paterno,
                materno,
                semestre_proximo,
                promedio,
                sexo,
                fecha_nacimiento,
                curp,
                carrera,
                correo,
                enviado,
                fecha_envio,
              folio, envio_archivos} = resp.user;
        this.usuario = new Usuario(
                _id,
                control,
                nombre,
                paterno,
                materno,
                semestre_proximo,
                promedio,
                sexo,
                fecha_nacimiento,
                curp,
                carrera,
                correo,
                enviado,
                fecha_envio,
                folio,
                ':)',
                envio_archivos
                );
              }),
      map( resp => true ),
      catchError( error => of(false) )
    );
  }




  login( formData: LoginForm ): Observable<any>{
    return this.http.post(`${ base_url }/alumnos/login`, formData )
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem('accessToken', resp.accessToken );
                    })
                  );
  } 




  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/');
  }


}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private http: HttpClient) { }

  subirAchivo(archivo: File): Observable<any>{

    const url = `${ base_url }/uploads/archivo`;

    const formData: FormData = new FormData();
    formData.append('archivo', archivo, archivo.name );

    return this.http.post( url, formData, { reportProgress: true } )
              .pipe(
                catchError( error => of(false) )
              );
  } 


  subirAchivos(archivos: FileList | []): Observable<any>{

    const url = `${ base_url }/uploads/archivos`;

    const formData: FormData = new FormData();

    for (let i = 0; archivos.length > i; i++){
      formData.append('archivos', archivos[i], archivos[i].name );
    }


    return this.http.post( url, formData, { reportProgress: true } )
              .pipe(
                catchError( error => of(false) )
              );
  } 


}


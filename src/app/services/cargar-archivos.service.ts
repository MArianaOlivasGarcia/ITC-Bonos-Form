import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import * as firebase from 'firebase';
import { Usuario } from '../auth/models/usuario.model';
import { FileItem } from '../encuesta/models/fileItem.model';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CargarArchivosService {

  private carpeta_archivos = 'bonos';
  private usuario: Usuario;
  completado: boolean = false;

  constructor(private db: AngularFirestore,
    private authService: AuthService) {
    this.usuario = authService.usuario
              }


  private guardarArchivo(archivo: { nombre: string, url: string }) {
    
    this.db.collection(`/${this.usuario.control}`)
        .add( archivo ) 
  } 


  async cargarArchivos(archivos: FileItem[]) {
    
      const storageRef = firebase.storage().ref()
    
    return new Promise((resolve, reject) => {
      let subido = 0;

      for (const item of archivos) {
        /*  item.estaSubiendo = true;
         if (item.progreso >= 100) {
           continue;
         } */
   
         const uploadTask: firebase.storage.UploadTask =
         storageRef.child(`${this.carpeta_archivos}/${this.usuario.control}/${item.nombreArchivo}`)
         .put(item.archivo);
         
         uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
           (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
           (error) => console.error('Error al subir', error),
           () => {
             console.log('Imagen Cargada correctamente')
             subido = subido + 1;
             item.url = uploadTask.snapshot.downloadURL;
             item.estaSubiendo = false;
             this.guardarArchivo({
               nombre: item.nombreArchivo,
               url: item.url
             })
             console.log(subido)
             if (subido == 4) {
               resolve(true);
             } 
           }
   
         )
       }
      })
    

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/models/usuario.model';
import Swal from 'sweetalert2';
import { Familiar } from '../../models/familiar.model';
import { EncuestaService } from '../../services/encuesta.service';
import { UploadService } from '../../services/upload.service';
import { FileItem } from '../../models/fileItem.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  usuario: Usuario;
  formSubmitted: boolean = false;
  form: FormGroup;

  familiares: Familiar[] = [];
  validaFamiliar: boolean = false;


  archivoSubir: File;
  extensionInvalid: boolean = false;
  notIsFour: boolean = false;

  archivosSubir: FileList | [];
  isUploadingFiles: boolean = false;



  constructor(private fb: FormBuilder,
    private uploadService: UploadService,
    private authService: AuthService,
    private encuestaService: EncuestaService,) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      'nombre': [this.usuario.nombre],
      'paterno': [this.usuario.paterno],
      'materno': [this.usuario.materno],
      'sexo': [this.usuario.sexo],
      'fecha_nacimiento': [this.usuario.fecha_nacimiento],
      'curp': [this.usuario.curp],
      'nacionalidad': ['', Validators.required],
      'lugar_nacimiento': this.fb.group({
        'localidad_ciudad': ['', Validators.required],
        'municipio': ['', Validators.required],
        'estado': ['', Validators.required],
      }),
      'estado_civil': ['', Validators.required],
      'zona_recidencial': ['', Validators.required],
      'domicilio_actual': this.fb.group({
        'calle_estado': ['', Validators.required],
        'colonia': ['', Validators.required],
        'codigo_postal': ['', Validators.required],
        'localidad_ciudad': ['', Validators.required],
        'municipio': ['', Validators.required],
        'estado': ['', Validators.required],
      }),
      'telefono': [''],
      'celular': ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$') ]],
      'correo': [this.usuario.correo],
      'discapacidad': ['', Validators.required],
      'origen_indigena': [null, Validators.required],
      'tipo_origen': [''],
      'becado': [null, Validators.required],
      'tipo_beca': [''],
      'turno': [null, Validators.required],
      'carrera': [this.usuario.carrera],
      'semestre_proximo': [this.usuario.semestre_proximo],
      'promedio': [this.usuario.promedio],
      'socioeconomicos': this.fb.group({
        'trabaja': [null, Validators.required],
        'perdio_trabajo': [null],
        'nombre_empresa': [''],
        'ingreso_mensual': [''],
        'depende_economicamente': [null],
        'nombre_jefe': [''],
        'telefono': [''],
        'puesto': [''],
        'antiguedad': [''],
        'domicilio_laboral': this.fb.group({
          'calle': [''],
          'no_exterior': [''],
          'colonia': [''],
          'municipio': [''],
          'localidad_ciudad': [''], 
          'estado': [''],
        }),
      }),
      'tutor': this.fb.group({
        'nombre': ['', Validators.required],
        'paterno': ['', Validators.required],
        'materno': ['', Validators.required],
        'parentesco': ['', Validators.required],
        'puesto': ['', Validators.required],
        'ingreso_mensual': ['', [Validators.required, Validators.min(0)]],
        'domicilio_laboral': this.fb.group({
          'calle': ['', Validators.required],
          'no_exterior': ['', Validators.required],
          'colonia': ['', Validators.required],
          'municipio': ['', Validators.required],
          'localidad_ciudad': ['', Validators.required],
          'estado': ['', Validators.required],
        }),
        'dependientes_economicos': ['', [Validators.required, Validators.min(0)]],
        'ingreso_familiar': ['', [Validators.required, Validators.min(0)]],
        'egresos': this.fb.group({
          'alimentacion': ['', [Validators.required, Validators.min(0)]],
          'gas': ['', [Validators.required, Validators.min(0)]],
          'agua': ['', [Validators.required, Validators.min(0)]],
          'predial': ['', [Validators.required, Validators.min(0)]],
          'electricidad': ['', [Validators.required, Validators.min(0)]],
          'telefono': ['', [Validators.required, Validators.min(0)]],
          'celular': ['', [Validators.required, Validators.min(0)]],
          'recreacion': ['', [Validators.required, Validators.min(0)]],
          'transporte': ['', [Validators.required, Validators.min(0)]],
          'educacion': ['', [Validators.required, Validators.min(0)]],
          'gastos_medicos': ['', [Validators.required, Validators.min(0)]],
          'abonos_creditos': ['', [Validators.required, Validators.min(0)]],
          'ropa_calzado': ['', [Validators.required, Validators.min(0)]],
          'fondos_ahorro': ['', [Validators.required, Validators.min(0)]],
          'renta': ['', [Validators.required, Validators.min(0)]],
        }),
      }),
      'vivienda': this.fb.group({
        'tenencia': [null, Validators.required],
        /* Poder validaciones en caso de que se cancele el cambio */
        'tipo': [null, Validators.required],
        'no_dormitorios': ['', [Validators.required, Validators.min(0)]],
        'habitaciones': this.fb.group({
          'sala': [false],
          'comedor': [false],
          'bano_privado': [false],
          'bano_compartido': [false],
        }),
        'material': this.fb.group({
          'paredes': [null, Validators.required],
          'techos': [null, Validators.required],
          'pisos': [null, Validators.required],
        }),
        // FIN
        'mobiliario': this.fb.group({
          'television': [false],
          'estereo': [false],
          'video': [false],
          'dvd': [false],
          'estufa': [false],
          'microondas': [false],
          'lavadora': [false],
          'refri': [false],
          'compu': [false],
        }),
        'servicios': this.fb.group({
          'agua_potable': [false],
          'luz_electrica': [false],
          'drenaje': [false],
          'pavimento': [false], 
          'transporte': [false],
          'linea_tel': [false],
          'internet': [false],
          'tv_cable': [false],
        }),
      }),
      'salud_fam': this.fb.group({
        'imss': [false],
        'issste': [false],
        'centro_salud': [false],
        'dispensario': [false],
        'medico_priv': [false],
        'frecuencia': ['', Validators.required],
      }),
      'familiar': this.fb.group({
        'nombre': [''],
        'edad': [''],
        'sexo': [null],
        'estado_civil': [null],
        'escolaridad': [null],
        'ocupacion': [''],
      }),
      
    });


   

    
    this.inputTrabajaValueChange();
    this.inputBecadoValueChange();
    this.inputOrigenIndigenaValueChange();
/*     this.inputTenenciaValueChange();
 */

    
  }


  campoValido(campo: string, campo2: string = '', campo3: string = ''): boolean {
    
    if (campo2 == '' && campo3 == '') {
      return this.form.controls[campo].errors && this.form.controls[campo].touched;
    } else if (campo2.length > 0 && campo3 == '') {
      return this.form.controls[campo].get(campo2).errors && this.form.controls[campo].get(campo2).touched;
    } else if (campo2.length > 0 && campo3.length > 0) {
      return this.form.controls[campo].get(campo2).get(campo3).errors && this.form.controls[campo].get(campo2).get(campo3).touched;
    }

  }


  mensajesError(campo: string, campo2: string = '', campo3: string = ''): string {

    if (campo2 == '' && campo3 == '') {
      return this.form.get(campo)?.hasError('required') ? `Este campo es requerido.` :
            this.form.get(campo)?.hasError('maxlength') ? `Máximo ${ this.form.get(campo).errors['maxlength']['requiredLength']} caracteres.` :
            this.form.get(campo)?.hasError('minlength') ? `Mínimo ${ this.form.get(campo).errors['minlength']['requiredLength']} caracteres.` :
            this.form.get(campo)?.hasError('pattern') ? `Campo inválido. Solo se permiten números del 0 al 9.` :
            this.form.get(campo)?.hasError('min') ? `No puede ser número negativo.` : '';
    } else if (campo2.length > 0 && campo3 == '') {
      return this.form.get(campo).get(campo2)?.hasError('required') ? `Este campo es requerido.` :
            this.form.get(campo).get(campo2)?.hasError('min') ? `No puede ser número negativo.` : '';
    } else if (campo2.length > 0 && campo3.length > 0) {
      return this.form.get(campo).get(campo2).get(campo3)?.hasError('required') ? `Este campo es requerido.` :
            this.form.get(campo).get(campo2).get(campo3)?.hasError('min') ? `No puede ser número negativo.` : '';
    }

    
  }

  


  showInput(campo1: string, campo2: string = ''): boolean {
    
    if (campo2 == '') {
      return this.form.get(campo1).value || this.form.get(campo1).value == null;
    } else if (campo1.length > 0 && campo2.length > 0) {
      return this.form.get(campo1).get(campo2).value || this.form.get(campo1).get(campo2).value == null;
    }
  }


 
  guardar() {

    this.formSubmitted = true;
    
    console.log(this.form.value)
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formSubmitted = false;
      Swal.fire({
        text: 'Revisa que todos los campos esten correctamente llenados.',
        icon: 'error'
      })
      return;
    } else if (!this.usuario.envio_archivos) {
      this.formSubmitted = false;
      Swal.fire({
        text: 'No has enviado tus documentos.',
        icon: 'error'
      })
      return;
    } 



    /* Si todo sale bien */

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez enviado no podrás hacer cambios en el formulario.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Enviar!',
      cancelButtonText: 'No, ¡Cancelar!'
    }).then( (result) => {
      if (result.isConfirmed) {

        
        const {familiar, ...obj} = this.form.value;
        const body = {
          ...obj,
          familiares: this.familiares
        }        

        
          this.encuestaService.create(body, this.usuario.id)
            .subscribe((resp: any) => {
              this.usuario.enviado = resp.user.enviado;
              this.usuario.folio = resp.user.folio;
              Swal.fire(
                '¡Enviado!',
                'Tu Solicitud de Bono de Reinscripción se ha enviado con éxito.',
                'success'
              );
            }, err => {
              this.formSubmitted = false;
              Swal.fire(
                'Oops!',
                err.error.message,
                'error'
              );
            })
       

      } else {
        this.formSubmitted = false;
      }
    })

  }


  uploadFiles() {


    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez enviados tus archivos no podrás hacer cambios.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Enviar!',
      cancelButtonText: 'No, ¡Cancelar!'
    }).then( (result) => {
      if (result.isConfirmed) {

        this.isUploadingFiles = true;
        Swal.showLoading();

        this.uploadService.subirAchivos( this.archivosSubir )
          .subscribe(resp => {

            if ( !resp.status ) {
              Swal.fire(
                '¡Archivos enviados con éxito!',
                'No olvides enviar tu formulario.',
                'error'
              );
              return;
            }

            this.usuario.envio_archivos = true;

            Swal.fire(
              '¡Archivos enviados con éxito!',
              'No olvides enviar tu formulario.',
              'success'
            );
            this.isUploadingFiles = false;


            }, err => {
              Swal.fire(
                'Oops!',
                err.error.message,
                'error'
              )
            this.isUploadingFiles = false;

          })
      }
    });
  }




  removeValidaciones(campo1: string, campo2: string = '', campo3: string = '') {
    
    if (campo1.length> 0 && campo2 == '' && campo3 == '') {
      this.form.get(campo1).setValidators([]);
      this.form.get(campo1).updateValueAndValidity();
      this.form.get(campo1).reset();
    } else if (campo2.length > 0 && campo3 == '') {
      this.form.get(campo1).get(campo2).setValidators([]);
      this.form.get(campo1).get(campo2).updateValueAndValidity();
      this.form.get(campo1).get(campo2).reset();
    } else if (campo2.length > 0 && campo3.length > 0) {
      this.form.get(campo1).get(campo2).get(campo3).setValidators([]);
      this.form.get(campo1).get(campo2).get(campo3).updateValueAndValidity();
      this.form.get(campo1).get(campo2).get(campo3).reset();
    }
    
  }


  addValidaciones( campo1: string, campo2: string = '', campo3 = '') {

    if (campo1.length> 0 && campo2 == '' && campo3 == '') {
      this.form.get(campo1).setValidators([Validators.required]);
      this.form.get(campo1).updateValueAndValidity();
    } else if (campo2.length > 0 && campo3 == '') {
      this.form.get(campo1).get(campo2).setValidators([Validators.required]);
      this.form.get(campo1).get(campo2).updateValueAndValidity();
    } else if (campo2.length > 0 && campo3.length > 0) {
      this.form.get(campo1).get(campo2).get(campo3).setValidators([Validators.required]);
      this.form.get(campo1).get(campo2).get(campo3).updateValueAndValidity();
    }
  }



  removeValidacionesTrabaja() {
    this.removeValidaciones('socioeconomicos', 'nombre_empresa');
    this.removeValidaciones('socioeconomicos', 'ingreso_mensual');
    this.removeValidaciones('socioeconomicos', 'depende_economicamente');
    /* this.removeValidaciones('socioeconomicos', 'perdio_trabajo'); */
    this.removeValidaciones('socioeconomicos', 'nombre_jefe');
    this.removeValidaciones('socioeconomicos', 'telefono');
    this.removeValidaciones('socioeconomicos', 'puesto');
    this.removeValidaciones('socioeconomicos', 'antiguedad');
    this.removeValidaciones('socioeconomicos', 'domicilio_laboral', 'calle');
    this.removeValidaciones('socioeconomicos', 'domicilio_laboral', 'no_exterior');
    this.removeValidaciones('socioeconomicos', 'domicilio_laboral', 'colonia');
    this.removeValidaciones('socioeconomicos', 'domicilio_laboral', 'municipio');
    this.removeValidaciones('socioeconomicos', 'domicilio_laboral', 'localidad_ciudad');
    this.removeValidaciones('socioeconomicos', 'domicilio_laboral', 'estado');
  }

  addValidacionesTrabaja() {
    this.addValidaciones('socioeconomicos', 'nombre_empresa');
    this.addValidaciones('socioeconomicos', 'ingreso_mensual');
    this.addValidaciones('socioeconomicos', 'depende_economicamente');
/*     this.addValidaciones('socioeconomicos', 'perdio_trabajo');
 */ this.addValidaciones('socioeconomicos', 'nombre_jefe');
    this.addValidaciones('socioeconomicos', 'telefono');
    this.addValidaciones('socioeconomicos', 'puesto');
    this.addValidaciones('socioeconomicos', 'antiguedad');
    this.addValidaciones('socioeconomicos', 'domicilio_laboral', 'calle');
    this.addValidaciones('socioeconomicos', 'domicilio_laboral', 'no_exterior');
    this.addValidaciones('socioeconomicos', 'domicilio_laboral', 'colonia');
    this.addValidaciones('socioeconomicos', 'domicilio_laboral', 'municipio');
    this.addValidaciones('socioeconomicos', 'domicilio_laboral', 'localidad_ciudad');
    this.addValidaciones('socioeconomicos', 'domicilio_laboral', 'estado');
  }




 




  addFamiliar() {

    this.validaFamiliar = false;
    const { familiar } = this.form.value;

    if( familiar.nombre == '' || 
      familiar.edad == '' ||
      familiar.sexo == null ||
      familiar.estado_civil == null ||
      familiar.escolaridad == null ||
      familiar.ocupacion == '') {
      this.validaFamiliar = true;
      return;
    }

    this.familiares.push(familiar);


    this.form.get('familiar').get('nombre').reset();
    this.form.get('familiar').get('edad').reset();
    this.form.get('familiar').get('sexo').reset();
    this.form.get('familiar').get('estado_civil').reset();
    this.form.get('familiar').get('escolaridad').reset();
    this.form.get('familiar').get('ocupacion').reset();



  }


  deleteFamiliar(i: number ){
    this.familiares.splice(i, 1);
  }

  changeArchivo(archivos: FileList) {
  
    
    if (archivos.length == 0) {

      this.notIsFour = false;
      return;
    }
    
    let extensionesValidas = ['pdf', 'jpg', 'png', 'jpeg'];

    for (let i = 0; archivos.length > i; i++){
      let nombreCortado = archivos.item(i).name.split('.'); //nombre.archivo.jpg
      let extensionArchivo = nombreCortado[nombreCortado.length - 1];
      if (!extensionesValidas.includes( extensionArchivo.toLowerCase() )) {
        this.extensionInvalid = true;
        this.notIsFour = false;
        return;
      }
    }
    
    if (archivos.length != 4) {
      this.notIsFour = true;
      this.extensionInvalid = false;
      return;
    }

    for (const propiedad in Object.getOwnPropertyNames(archivos)) {
      const archivoTemporal = archivos[propiedad];
      const nombreCortado = archivoTemporal.name.split('.'); //nombre.archivo.jpg
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];
      const nombreArchivo = `${this.usuario.control}-${parseInt(propiedad) + 1}.${extensionArchivo}`;
      const nuevoArchivoItem = new FileItem(archivoTemporal, nombreArchivo);
    }

    //console.log(this.archivos);
    
    

    this.extensionInvalid = false;
    this.notIsFour = false;
    this.archivosSubir = archivos 

  }


/* POR DISCUTIR */
  /* inputTenenciaValueChange() {
    this.form.get('vivienda').get('tenencia').valueChanges
      .subscribe(value => {
        if (value == "null") {
          this.form.get('vivienda').get('tenencia').setErrors({ required: true })
        } else if (value == 'Prestada' || value == 'Invadida') {
          this.removeValidaciones('vivienda', 'tipo')
          this.removeValidaciones('vivienda', 'no_dormitorios')
          this.removeValidaciones('vivienda', 'material', 'paredes')
          this.removeValidaciones('vivienda', 'material', 'techos')
          this.removeValidaciones('vivienda', 'material', 'pisos')
        } else {
          this.addValidaciones('vivienda', 'tipo')
          this.addValidaciones('vivienda', 'no_dormitorios')
          this.addValidaciones('vivienda', 'material', 'paredes')
          this.addValidaciones('vivienda', 'material', 'techos')
          this.addValidaciones('vivienda', 'material', 'pisos')
        }
      })
  }  */
/* POR DISCUTIR */


  inputTrabajaValueChange() {
    this.form.get('socioeconomicos').get('trabaja').valueChanges
      .subscribe(value => {
        if (value == "null") {
          this.form.get('socioeconomicos').get('trabaja').setErrors({ required: true })
        } else if (!value) {
          this.addValidaciones('socioeconomicos', 'perdio_trabajo');
          this.removeValidacionesTrabaja();
        } else if (value) {
          this.removeValidaciones('socioeconomicos', 'perdio_trabajo');
          this.addValidacionesTrabaja()
        } 
      })
  }
 

  inputBecadoValueChange(){
    this.form.get('becado').valueChanges
      .subscribe(value => {
        if (value == "null") {
          this.form.get('becado').setErrors({ required: true })
        } else if (!value) {
          this.removeValidaciones('tipo_beca');
        } else if (value) {
          this.addValidaciones('tipo_beca');
        }
        
      })
  }


  inputOrigenIndigenaValueChange() {
    this.form.get('origen_indigena').valueChanges
      .subscribe(value => {
        if (value == "null") {
          this.form.get('origen_indigena').setErrors({ required: true })
        } else if (!value) {
          this.removeValidaciones('tipo_origen');
        } else if (value) {
          this.addValidaciones('tipo_origen');
        }
        
      })
  }


  


  

}

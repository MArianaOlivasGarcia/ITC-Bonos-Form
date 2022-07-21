import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitted: boolean = false;

  form: FormGroup = this.fb.group({
    'control'   : [ localStorage.getItem('control') || '', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]],
    'password'  : ['', Validators.required],
    'recuerdame': [false],
  }/* ,{
    validators: this.numControlValido('control')
  } */);

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
  }


  campoValido( campo: string ): boolean {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }


  mensajesError( campo: string  ): string {
    return this.form.get(campo)?.hasError('required') ? `Este campo es requerido.` :
            this.form.get(campo)?.hasError('maxlength') ? `Máximo ${ this.form.get(campo).errors['maxlength']['requiredLength']} caracteres.` :
            this.form.get(campo)?.hasError('minlength') ? `Mínimo ${ this.form.get(campo).errors['minlength']['requiredLength']} caracteres.` :
            this.form.get(campo)?.hasError('noNumCtl') ? `Número de control inválido.` : '';
  }



  login(): void {

    this.formSubmitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formSubmitted = false;
      return;
    }

    

    this.authService.login(this.form.value)
      .subscribe(() => {
        if (this.form.get('recuerdame')?.value) {
          localStorage.setItem('control', this.form.get('control')?.value )    
        } else {
          localStorage.removeItem('control');
        }
        Swal.close()
        this.router.navigate(['./encuesta']);
        
      }, err => {
        this.formSubmitted = false;
        Swal.fire({
          text: err.error.message,
          icon: 'error'
        });

      }); 
  }


  numControlValido( matricula: string ) {

    return ( formGroup: FormGroup ) => {

      const matriculaControl = formGroup.get(matricula)
      const valor = matriculaControl.value;
      const regExp = new RegExp('^[0-9]+$');
      const valid = regExp.test(valor);

      if (valor == '') {
        return
      }

      if (valid) {
        return
      } else {
        matriculaControl.setErrors({noNumCtl: true});
      }
      
    };
 
  }


}

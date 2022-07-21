import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './pages/form/form.component';
import { EncuestaRoutingModule } from './encuesta-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EncuestaComponent } from './encuesta.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@NgModule({
  declarations: [
    FormComponent,
    EncuestaComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,
    ReactiveFormsModule,

  ]
})
export class EncuestaModule { }

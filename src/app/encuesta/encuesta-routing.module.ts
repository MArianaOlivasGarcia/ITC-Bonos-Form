import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './encuesta.component';

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'form',
            component: EncuestaComponent
        },
        {
            path: '**',
            redirectTo: 'form'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaRoutingModule { }
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Usuario } from '../auth/models/usuario.model';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService) {
    this.usuario = this.authService.usuario;
   }

  ngOnInit(): void {
    
  }

}

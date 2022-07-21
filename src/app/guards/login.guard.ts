import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor( private authService: AuthService,
               private router: Router ){}


  canActivate(): boolean {

    if (this.authService.usuario) {
      return false;
    } else {
      return true;
    }

  }
}

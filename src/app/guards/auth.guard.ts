import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService,
               private router: Router ){}


  canActivate(): Observable<boolean> {

    return this.authService.validarToken()
      .pipe(
        tap( estaAutenticado => {
        if ( !estaAutenticado ) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );

  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/others/alert/alert.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    const flag = this.auth.validateToken();

    if (!flag) {
      this.alert.createAlert('Debes iniciar sesion para entrar a esta pagina.');
      this.router.navigate(['login']);
    }
    return flag;
  }
  
}

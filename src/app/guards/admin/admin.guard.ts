import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/others/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    const flag = this.auth.validateAdmin();

    if (!flag) {
      this.alert.createAlert('Inicia sesion como admin para entrar a esta pagina.');
      this.router.navigate(['login']);
    }
    return flag;
  }
  
}

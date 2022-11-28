import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { AlertService } from '../others/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarios: any[] = [];

  constructor(
    private firebase: FirebaseService,
    private alert: AlertService
  ) { 
    this.firebase.getData('usuarios').subscribe((res) => {
      this.usuarios = res;
    });
  }

  validateRegister(data: any) {
    const result = this.usuarios.filter(ar => data.username === ar.username || data.email === ar.email);

    if (result.length == 0) {
      this.firebase.setData('usuarios', data);
      this.alert.createAlert('Usuario registrado con exito.');

      return true;
    } else {
      const user = result[0]

      let message = '';
      if (user.username === data.username) {
        message += 'Username no disponible.<br>'
      }
      if (user.email === data.email) {
        message += 'Correo no disponible.'
      }

      this.alert.createAlert(message);

      return false;
    }
  }

  validateLogin(data: any) {
    const result = this.usuarios.filter(ar => data.username === ar.username && data.password === ar.password);

    if (result.length > 0) {
      const user = result[0];

      localStorage.setItem('token', user.id);
      this.alert.createAlert('Ingresando...');

      return true;
    } else {
      return false;
    }
  }
}

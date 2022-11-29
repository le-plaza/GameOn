import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { AlertService } from '../others/alert/alert.service';
import { EventService } from '../others/event/event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarios: any[] = [];

  constructor(
    private firebase: FirebaseService,
    private alert: AlertService,
    private event: EventService
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
      this.event.publish(user.admin);

      return true;
    } else {
      return false;
    }
  }

  validateEdit(data: any) {
    const token: any = localStorage.getItem('token');
    const result = this.usuarios.filter(ar => (data.username === ar.username || data.email === ar.email) && ar.id !== token);

    if (result.length == 0) {
      this.firebase.editData('usuarios', token, data);
      this.alert.createAlert('Perfil editado correctamente.');

      return true;
    } else {

      let message = '';
      if (result.some(ar => ar.username === data.username)) {
        message += 'Username no disponible.<br>'
      }
      if (result.some(ar => ar.email === data.email)) {
        message += 'Correo no disponible.';
      }
      this.alert.createAlert(message);
      
      return false;
    }
  }

  validateToken() {
    const token = localStorage.getItem('token');

    if (token == null) {
      return false;
    } else {
      return true;
    }
  }

}

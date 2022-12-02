import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
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

  validateRegister(data: IUser) {
    const result = this.usuarios.filter(
      (ar: IUser) => data.username.toLowerCase() === ar.username.toLowerCase() 
        || data.email.toLowerCase() === ar.email.toLowerCase());

    if (result.length == 0) {
      this.firebase.setData('usuarios', data);
      this.alert.createAlert('Usuario registrado con exito.');

      return true;
    } else {
      let message = '';
      if (result.some((ar: IUser) => ar.username.toLowerCase() === data.username.toLowerCase())) {
        message += 'Username no disponible.<br>'
      }
      if (result.some((ar: IUser) => ar.email.toLowerCase() === data.email.toLowerCase())) {
        message += 'Correo no disponible.'
      }

      this.alert.createAlert(message);

      return false;
    }
  }

  validateLogin(data: IUser) {
    const result = this.usuarios.filter((ar: IUser) => 
      data.username.toLowerCase() === ar.username.toLowerCase() && data.password === ar.password);

    if (result.length > 0) {
      const user: IUser = result[0];

      localStorage.setItem('token', user.id);
      localStorage.setItem('admin', user.admin.toString());

      this.alert.createAlert('Ingresando...');
      this.event.setAdmin(user.admin);

      return true;
    } else {
      this.alert.createAlert('Correo o contraseña incorrectos.');
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

  validateAdmin() {
    const admin = localStorage.getItem('admin');

    if (admin == "false" || admin == null) {
      return false;
    } else {
      return true;
    }
  }

}

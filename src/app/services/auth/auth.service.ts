import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarios: any[] = [];

  constructor(
    private firebase: FirebaseService
  ) { 
    this.firebase.getData('usuarios').subscribe((res) => {
      this.usuarios = res;
    });
  }

  validateRegister(data: any) {
    const result = this.usuarios.filter(ar => data.username === ar.username || data.email === ar.email);

    if (result.length == 0) {
      this.firebase.setData('usuarios', data);

      return true;
    } else {
      return false;
    }
  }

  validateLogin(data: any) {
    const result = this.usuarios.filter(ar => data.username === ar.username && data.password === ar.password);

    if (result.length > 0) {
      const user = result[0];
      localStorage.setItem('token', user.id);

      return true;
    } else {
      return false;
    }
  }
}

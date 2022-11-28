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

  validateLogin(data: any) {
    // SEE IF USER EXISTS IN OBJECT
    const result = this.usuarios.filter(ar => data.username === ar.username && data.password === ar.password);

    if (result.length > 0) {
      // GET USER AND GET TOKEN
      const user = result[0];
      localStorage.setItem('token', user.id);

      return true;
    } else {
      return false;
    }
  }
}

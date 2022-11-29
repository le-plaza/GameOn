import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    localStorage.clear();
  }

  login() {
    const flag = this.auth.validateLogin(this.formulario.value);

    if (flag) {
      this.router.navigate(['main']);
    } else {
      alert('Nombre de usuario o contraseña incorrecta.');
    }
  }

}

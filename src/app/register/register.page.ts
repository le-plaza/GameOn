import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formulario: FormGroup = this.fb.group({
    fullname: [''],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(4)],
    genero: [''],
    admin: [false]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    const flag = this.auth.validateRegister(this.formulario.value);

    if (flag) {
      this.router.navigate(['login']);
    } else {
      alert('Nombre de usuario o email en uso.');
    }
  }

}

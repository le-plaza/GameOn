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
  showPassword: boolean = false;
  formulario: FormGroup = this.fb.group({
    fullname: [''],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
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

  passwordbtn() {
    this.showPassword = !this.showPassword;
    const option = this.showPassword ? 'text' : 'password';

    const input = document.getElementById('password');
    input?.setAttribute('type', option);
  }

  register() {
    const flag = this.auth.validateRegister(this.formulario.value);

    if (flag) {
      this.router.navigate(['login']);
    }
  }

}

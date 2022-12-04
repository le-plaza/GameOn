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
  showPassword: boolean = false;
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
    this.formulario.reset();
  }

  passwordbtn() {
    this.showPassword = !this.showPassword;
    const option = this.showPassword ? 'text' : 'password';

    const input = document.getElementById('password');
    input?.setAttribute('type', option);
  }

  login() {
    const flag = this.auth.validateLogin(this.formulario.value);

    if (flag) {
      this.router.navigate(['main', '1']);
    }
  }

}

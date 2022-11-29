import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  token: any;
  user: any;
  formulario: FormGroup = this.fb.group({
    fullname: [''],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    genero: ['']
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebase: FirebaseService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.paramMap.get('id');

    this.firebase.getById('usuarios', this.token).subscribe((res) => {
      this.user = res;
    });
  }

  editProfile() {
    const flag = this.auth.validateEdit(this.formulario.value);

    if (flag) {
      this.router.navigate(['profile']);
    }
  }

}

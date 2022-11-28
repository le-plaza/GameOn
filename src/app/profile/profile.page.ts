import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
    const token:any = localStorage.getItem('token');

    this.firebase.getById('usuarios', token).subscribe((res) => {
      this.user = res;
    });
  }

}

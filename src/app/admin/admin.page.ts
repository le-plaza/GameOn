import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { FirebaseService } from '../services/firebase/firebase.service';
import { AlertService } from '../services/others/alert/alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  usuarios: IUser[] = [];

  constructor(
    private firebase: FirebaseService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.firebase.getData('usuarios').subscribe((res: any[]) => {
      const result = res.filter(i => i.id !== localStorage.getItem('token'))
      this.usuarios = result;
    });
  }

  givePermissions(user: any) {
    this.firebase.editData('usuarios', user.id, { admin: true });
    this.alert.createAlert('Has dado admin a: ' + user.username);
  }

  deleteProfile(user: any) {
    this.firebase.getData('juegos').subscribe((res) => {
      const result = res.filter((i: any) => i.id_user === user.id);
      result.forEach(data => {
        this.firebase.deleteData('juegos', data.id);
      });
      this.firebase.deleteData('usuarios', user.id);

      this.alert.createAlert('Has eliminado a: ' + user.username);
    });
  }

}

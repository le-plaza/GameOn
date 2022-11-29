import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';
import { AlertService } from '../services/others/alert/alert.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  juegos: any[] = [];

  constructor(
    private firebase: FirebaseService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');

    this.firebase.getData('juegos').subscribe((games) => {
      const result = games.filter((i: any) => i.id_user === token);

      this.juegos = result;
    });
  }

  refundGame(juego: any) {
    this.firebase.deleteData('juegos', juego.id);
    this.alert.createAlert('Has devuelto: ' + juego.titulo);
  }

}

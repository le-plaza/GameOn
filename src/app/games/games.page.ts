import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  juegos: any[] = [];

  constructor(
    private firebase: FirebaseService
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
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { FirebaseService } from '../services/firebase/firebase.service';
import { AlertService } from '../services/others/alert/alert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  token: string | undefined | null = '';
  juegos: any[] = [];

  constructor(
    private api: ApiService,
    private firebase: FirebaseService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');

    this.api.getGames().subscribe((allgames: any) => {
      this.firebase.getData('juegos').subscribe((buyedgames) => {
        const buyed = buyedgames.filter((i: any) => i.id_user === this.token);
        this.juegos = this.deleteBuyedGames(allgames.results, buyed);
      });
    });
  }

  buyGame(juego: any) {
    const data = {
      id_juego: juego.id,
      id_user: this.token,
      titulo: juego.name,
      imagen: juego.background_image,
      rating: juego.rating,
      generos: juego.genres,
      screenshots: juego.short_screenshots
    }

    this.firebase.setData('juegos', data);
    this.alert.createAlert('Has comprado: ' + juego.name);
  }
  
  deleteBuyedGames(array1: any[], array2: any[]) {
    const result = array1.filter(ar => !array2.find(rm => (ar.id === rm.id_juego)));

    return result;
  }

}

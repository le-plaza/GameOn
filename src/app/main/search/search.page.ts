import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AlertService } from 'src/app/services/others/alert/alert.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  token: any;
  slug: any;
  searched: any;

  screenshots: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private firebase: FirebaseService,
    private alert: AlertService
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.slug = this.activatedRoute.snapshot.paramMap.get('game');

    this.api.searchGame(this.slug).subscribe((game: any) => {
      this.firebase.getData('juegos').subscribe((buyedgames) => {
        const buyed = buyedgames.filter((i: any) => i.id_juego === game.id && i.id_user === this.token);
        
        if (buyed.length > 0) {
          const btn = document.getElementById('btn');
          btn?.setAttribute('disabled', 'true');
        }
      });
      this.searched = game;
    });
  }

  buyGame(juego: any) {
    this.api.getScreenshots(juego.id).subscribe((images: any) => {
      const data = {
        id_juego: juego.id,
        id_user: this.token,
        titulo: juego.name,
        imagen: juego.background_image,
        rating: juego.rating,
        generos: juego.genres,
        screenshots: images.results
      }
  
      this.firebase.setData('juegos', data);
      this.alert.createAlert('Has comprado: ' + juego.name);
    });
  }

}

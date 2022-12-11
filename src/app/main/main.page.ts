import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { FirebaseService } from '../services/firebase/firebase.service';
import { AlertService } from '../services/others/alert/alert.service';
import { EventService } from '../services/others/event/event.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  token: string | undefined | null = '';
  currentPage: any = ''
  juegos: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private firebase: FirebaseService,
    private alert: AlertService,
    private event: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentPage = this.activatedRoute.snapshot.paramMap.get('page');
    this.token = localStorage.getItem('token');

    this.api.getGames(this.currentPage).subscribe((allgames: any) => {
      this.firebase.getData('juegos').subscribe((buyedgames) => {
        const buyed = buyedgames.filter((i: any) => i.id_user === this.token);
        this.juegos = this.deleteBuyedGames(allgames.results, buyed);

        this.event.setCounter(buyed.length);
      });
    });
  }

  searchGame(slug: any) {
    const game = slug.split(' ').join('-').toLowerCase();
    
    
    this.api.searchGame(game).subscribe((res: any) => {
      if (res.redirect !== undefined) {
        this.router.navigate([`main/${this.currentPage}/search/${res.slug}`]);
      } else {
        this.router.navigate([`main/${this.currentPage}/search/${game}`]);
      }
    }, (err) => {
      this.alert.createAlert('Juego no encontrado...');
    });
  }

  previousPage() {
    this.router.navigate(['main', parseInt(this.currentPage) - 1]);
  }
  nextPage() {
    this.router.navigate(['main', parseInt(this.currentPage) + 1]);
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

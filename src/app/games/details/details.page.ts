import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AlertService } from 'src/app/services/others/alert/alert.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: any;
  juego: any;

  options = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebase: FirebaseService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.firebase.getById('juegos', this.id).subscribe((res) => {
      this.juego = res;
    });
  }

  refundGame(juego: any) {
    this.router.navigate(['games']);
    this.firebase.deleteData('juegos', juego.id);
    this.alert.createAlert('Has devuelto: ' + juego.titulo);
  }

}

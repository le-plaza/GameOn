import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toast: ToastController
  ) { }

  createAlert(message: string) {
    this.toast.dismiss().then(() => {}).catch(() => {}).finally(async () => {
      const toast = await this.toast.create({
        message: message,
        duration: 2500,
        position: 'bottom',
        cssClass: 'alert'
      });

      await toast.present();
    });
  }
}

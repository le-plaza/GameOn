import { Component } from '@angular/core';
import { EventService } from './services/others/event/event.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  admin: boolean = false;
  
  constructor(
    private event: EventService
  ) {
    this.event.getObservable().subscribe((res) => {
      this.admin = res;
    });
  }
}

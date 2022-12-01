import { Component } from '@angular/core';
import { EventService } from './services/others/event/event.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  admin: boolean = false;
  counter: number = 0;
  
  constructor(
    private event: EventService
  ) {
    this.event.getAdmin().subscribe((res) => {
      this.admin = res;
    });

    this.event.getCounter().subscribe((res) => {
      this.counter = res;
    });
  }
}

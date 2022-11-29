import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event = new Subject();

  constructor() { }

  publish(data: any) {
    this.event.next(data);
  }

  getObservable(): Subject<any> {
    return this.event;
  }
}

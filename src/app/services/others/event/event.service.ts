import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  adminEvent = new Subject();
  counterEvent = new Subject();

  constructor() { }

  setCounter(data: number) {
    this.counterEvent.next(data);
  }

  getCounter(): Subject<any> {
    return this.counterEvent;
  } 

  setAdmin(data: boolean) {
    this.adminEvent.next(data);
  }

  getAdmin(): Subject<any> {
    return this.adminEvent;
  }
}

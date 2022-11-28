import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getGames() {
    return this.http.get('https://api.rawg.io/api/games?key=4a73232670134cab91364b6491cca14a');
  }
}

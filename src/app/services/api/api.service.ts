import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getGames(page: string) {
    return this.http.get(`https://api.rawg.io/api/games?key=4a73232670134cab91364b6491cca14a&page=${page}`);
  }

  searchGame(slug: string) {
    return this.http.get(`https://api.rawg.io/api/games/${slug}?key=4a73232670134cab91364b6491cca14a`);
  }

  getScreenshots(id: string) {
    return this.http.get(`https://api.rawg.io/api/games/${id}/screenshots?key=4a73232670134cab91364b6491cca14a`);
  }
}

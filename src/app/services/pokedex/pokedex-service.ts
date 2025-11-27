import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  type: string;
  sub_type: string;
  gen: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private readonly POKEDEX_JSON_PATH = 'assets/json/pokedex.json';

  constructor(
    private http: HttpClient
  ) {

  }

  loadData(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.POKEDEX_JSON_PATH);
  }
}
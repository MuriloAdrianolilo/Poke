import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { PokedexService, Pokemon } from '../../services/pokedex/pokedex-service';

const POKEDEX_DB = 'pokedex_db';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {

  private storageReady: Promise<void>;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.storageReady = this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async salvarPokedex(numeroParaSalvar: Pokemon[]): Promise<void> {
    await this.storageReady;
    await this._storage?.set(POKEDEX_DB, numeroParaSalvar);
  }

  async carregarPokedex(): Promise<Pokemon[] | null> {
    await this.storageReady;

    if (this._storage) {
      const value: Pokemon[] | null = await this._storage.get(POKEDEX_DB);
      return value;
    } else {
      console.error("Storage não está inicializado.");
      return null;
    }

  }

}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // <-- Necessário para requisições
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonButton]
})
export class PokemonPage implements OnInit {

  pokemonId: number | null = null;
  private readonly POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  pokemon: any = null;
  audio: HTMLAudioElement;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    addIcons({ playCircleOutline });
    this.audio = new Audio();

  }

  ngOnInit() {
    this.init();
  }

  async init() {
    const id = this.getPokemonId();

    if (id !== null) {
      try {
        const pokemonObservable = this.getPokemonDetails(id);
        this.pokemon = await firstValueFrom(pokemonObservable);
        console.log(this.pokemon);
        this.audio = new Audio(this.pokemon.cries.latest);
        this.audio.load();
      } catch (error) {
        console.error('Falha ao carregar detalhes:', error);
      }
    }
  }


  getPokemonId(): number | null {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null && !isNaN(Number(idParam))) {
      this.pokemonId = Number(idParam);
      console.log('ID do Pokémon carregado:', this.pokemonId);
      return this.pokemonId;
    } else {
      console.error('ID do Pokémon não encontrado ou inválido na URL.');
      this.pokemonId = null;
      return null;
    }
  }
  getPokemonDetails(pokemonId: number): Observable<any> {
    const url = `${this.POKEAPI_BASE_URL}${pokemonId}`;

    return this.http.get<any>(url);
  }

  play() {
    this.audio.play();
  }

}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
import { IonAvatar, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText } from '@ionic/angular/standalone';
import { PokedexService, Pokemon } from '../../services/pokedex/pokedex-service';
import { firstValueFrom } from 'rxjs';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MenuComponent, IonAvatar, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText, IonIcon]
})
export class PokedexPage implements OnInit {
  public pokedex: Pokemon[] = [];
  public pokedexfull: Pokemon[] = [];
  public colors: Record<string, string> = {};

  public selectGen: number = 1;
  public selectType: string = "0";
  public selectSubType: string = "0";

  public typeLabels: string[] = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ];

  constructor(
    private pokedexservice: PokedexService

  ) {
    addIcons({ heartOutline, heart });

  }

  async ngOnInit() {
    const pokemonObservable = this.pokedexservice.loadData();
    this.pokedexfull = await firstValueFrom(pokemonObservable);
    this.pokedexfull = this.pokedexfull.map(pokemon => ({
      ...pokemon,
      isFavorite: false
    }));
    const pokedextemp = this.pokedexfull;
    this.pokedex = pokedextemp.filter(pokemon => pokemon.gen === 1);
    this.colors = this.pokedexservice.getColors();
  }

  formatarNumero(num: number): string {
    return String(num).padStart(3, '0');
  }

  filtrarGen(event: any) {
    this.selectGen = Number(event.detail.value);
    this.aplicarFiltros();
  }

  filtrarType(event: any) {
    this.selectType = event.detail.value;
    this.aplicarFiltros();
  }

  filtrarSubType(event: any) {
    this.selectSubType = event.detail.value;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let resultado: any[] = this.pokedexfull;

    if (this.selectGen !== 0) {
      resultado = resultado.filter(pokemon => pokemon.gen === this.selectGen);
    }

    if (this.selectType !== "0") {
      const selectedTypeLower = this.selectType.toLowerCase();
      resultado = resultado.filter(pokemon =>
        pokemon.type.toLowerCase() === selectedTypeLower
      );
    }

    if (this.selectSubType !== "0") {
      const selectedSubTypeLower = this.selectSubType.toLowerCase();
      resultado = resultado.filter(pokemon => {
        return pokemon.sub_type && pokemon.sub_type.toLowerCase() === selectedSubTypeLower;
      });
    }

    this.pokedex = resultado;
  }

  getColor(type: string) {

    const lowerCaseType = type.toLowerCase();
    const color = this.colors[lowerCaseType] || '#cccccc';

    return color;
  }


  toggleFavorite(pokemon: Pokemon) {
    pokemon.isFavorite = !pokemon.isFavorite;

  }

}

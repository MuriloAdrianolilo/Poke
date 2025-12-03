import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
import { FavoritosService } from '../../services/favoritos/favoritos-service';
import { IonAvatar, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { IonIcon } from '@ionic/angular/standalone';
import { heartOutline, heart } from 'ionicons/icons';
import { PokedexService, Pokemon } from '../../services/pokedex/pokedex-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuComponent,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonText,
    IonIcon]
})

export class FavoritosPage implements OnInit {
  public pokedex: Pokemon[] = [];
  public pokedexfull: Pokemon[] | null = null;
  public colors: Record<string, string> = {};

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
    private pokedexService: PokedexService,
    private favoritosService: FavoritosService,
    private router: Router

  ) {
    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    this.init();
  }

  async init() {

    await this.carregar();

    const pokedextemp = this.pokedexfull;
    if (pokedextemp) {
      this.pokedex = pokedextemp.filter(pokemon => pokemon.isFavorite === true);
    }
    this.colors = this.pokedexService.getColors();
    console.log(this.pokedex);
  }

  async carregar() {
    const pokedexDB = await this.favoritosService.carregarPokedex();
    this.pokedexfull = pokedexDB;

  }

  getColor(type: string) {

    const lowerCaseType = type.toLowerCase();
    const color = this.colors[lowerCaseType] || '#cccccc';

    return color;
  }

  formatarNumero(num: number): string {
    return String(num).padStart(3, '0');
  }

  async toggleFavorite(pokemon: Pokemon) {
    pokemon.isFavorite = !pokemon.isFavorite;
    if (this.pokedexfull) {

      this.favoritosService.salvarPokedex(this.pokedexfull);

      console.log(`Estado de favorito de ${pokemon.name} alterado e Pokédex salva.`);
    } else {
      console.error("Erro: Pokédex completa (this.pokedexfull) está nula e não pode ser salva.");
    }

  }

  goToPokemonDetails(pokemonId: number) {

    this.router.navigate(['/pokemon', pokemonId]);
  }

}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
import { IonAvatar, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText, IonButton } from '@ionic/angular/standalone';
import { PokedexService, Pokemon } from '../../services/pokedex/pokedex-service';
import { firstValueFrom } from 'rxjs';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';
import { FavoritosService } from '../../services/favoritos/favoritos-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuComponent,
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonText,
    IonButton,
    IonIcon]
})
export class PokedexPage implements OnInit {
  public pokedex: Pokemon[] = [];
  public pokedexfull: Pokemon[] | null = null;
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

    if (!this.pokedexfull) {
      const pokemonObservable = this.pokedexService.loadData();
      this.pokedexfull = await firstValueFrom(pokemonObservable);
      this.pokedexfull = this.pokedexfull.map(pokemon => ({
        ...pokemon,
        isFavorite: false
      }));

      this.save(this.pokedexfull);
      console.log('Puxou os dados json e salvou');

    }
    else {
      console.log('Puxou os dados do banco de dados salvo');
    }

    const pokedextemp = this.pokedexfull;
    this.pokedex = pokedextemp.filter(pokemon => pokemon.gen === 1);
    this.colors = this.pokedexService.getColors();
  }

  async carregar() {
    const pokedexDB = await this.favoritosService.carregarPokedex();
    this.pokedexfull = pokedexDB;

  }

  async save(pokedexDB: Pokemon[]) {
    this.favoritosService.salvarPokedex(pokedexDB);
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
    let resultado: Pokemon[] = this.pokedexfull || [];

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


  async toggleFavorite(pokemon: Pokemon) {
    pokemon.isFavorite = !pokemon.isFavorite;
    if (this.pokedexfull) {

      await this.save(this.pokedexfull);

      console.log(`Estado de favorito de ${pokemon.name} alterado e Pokédex salva.`);
    } else {
      console.error("Erro: Pokédex completa (this.pokedexfull) está nula e não pode ser salva.");
    }

  }

  goToPokemonDetails(pokemonId: number) {

    this.router.navigate(['/pokemon', pokemonId]);
  }

}

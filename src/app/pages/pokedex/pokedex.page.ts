import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
import { IonAvatar, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { PokedexService, Pokemon } from '../../services/pokedex/pokedex-service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MenuComponent, IonAvatar, IonItem, IonLabel, IonList, IonSelect, IonSelectOption]
})
export class PokedexPage implements OnInit {
  public pokedex: Pokemon[] = [];
  public pokedexfull: Pokemon[] = [];

  constructor(
    private pokedexservice: PokedexService
  ) {

  }

  async ngOnInit() {
    const pokemonObservable = this.pokedexservice.loadData();
    this.pokedexfull = await firstValueFrom(pokemonObservable);
    const pokedextemp = this.pokedexfull;
    this.pokedex = pokedextemp.filter(pokemon => pokemon.gen === 1);
  }

  formatarNumero(num: number): string {
    return String(num).padStart(3, '0');
  }

  filtrarGen(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    const gen: number = Number(target.value);

    const pokedextemp = this.pokedexfull;

    if (gen == 0) {
      this.pokedex = this.pokedexfull;
    } else {
      this.pokedex = pokedextemp.filter(pokemon => pokemon.gen === gen);

    }
  }

}

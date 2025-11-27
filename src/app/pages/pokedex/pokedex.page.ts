import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
import { IonAvatar, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { PokedexService, Pokemon } from '../../services/pokedex/pokedex-service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MenuComponent, IonAvatar, IonItem, IonLabel, IonList]
})
export class PokedexPage implements OnInit {
  public pokedex: Pokemon[] = [];

  constructor(
    private pokedexservice: PokedexService
  ) {

  }

  async ngOnInit() {
    const pokemonObservable = this.pokedexservice.loadData();
    this.pokedex = await firstValueFrom(pokemonObservable);
    console.log (this.pokedex);
  }

}

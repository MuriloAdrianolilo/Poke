import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
import { FavoritosService } from '../../services/favoritos/favoritos-service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MenuComponent, IonButton]
})

export class FavoritosPage implements OnInit {

  constructor(
    private favoritosService: FavoritosService
  ) { }

  ngOnInit() {
  }
  
  async carregar() {
    const pokedexDB = await this.favoritosService.carregarPokedex();
    return pokedexDB;
  }
}
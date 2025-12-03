import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'pokedex',
    loadComponent: () => import('./pages/pokedex/pokedex.page').then( m => m.PokedexPage)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then( m => m.FavoritosPage)
  },
  {
    path: 'ajuda',
    loadComponent: () => import('./pages/ajuda/ajuda.page').then( m => m.AjudaPage)
  },
  {
    path: 'pokemon',
    loadComponent: () => import('./pages/pokemon/pokemon.page').then( m => m.PokemonPage)
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon.page').then(m => m.PokemonPage)
  },
];


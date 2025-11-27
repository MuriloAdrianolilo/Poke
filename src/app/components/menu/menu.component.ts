import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, bugOutline, heartOutline, helpOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [ IonIcon, IonFooter, IonTabBar, IonTabButton, IonTabs],

})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    addIcons({ homeOutline, bugOutline, heartOutline, helpOutline });
  }

  ngOnInit() { }

  navigate(url: any) {
    this.router.navigateByUrl(url);

  }

}
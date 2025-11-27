import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, bugOutline, heartOutline, helpOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonContent, IonHeader, IonIcon, IonTab, IonFooter, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar],

})
export class MenuComponent  implements OnInit {

  constructor() { 
    addIcons({ homeOutline, bugOutline, heartOutline, helpOutline });
 }

  ngOnInit() {}

}

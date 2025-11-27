import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from "./menu/menu.component";

@NgModule ({

    imports: [
        CommonModule, 
        MenuComponent
    ],
    declarations: [MenuComponent],
    exports: [MenuComponent]
})
export class ComponentsModule {

}
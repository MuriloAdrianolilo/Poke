import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePage } from "./home.page";
import { ComponentsModule } from "../../components/components.module";

@NgModule ({

    imports: [
        CommonModule, 
        ComponentsModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {

}
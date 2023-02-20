import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserManagmentRoutingModule } from "./user-managment-routing.module";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { FormsModule } from "@angular/forms";
import { ProfileComponent } from "./components/profile/profile.component";
import { ClanskeKarticeZaOdobrenjeComponent } from './components/clanske-kartice-za-odobrenje/clanske-kartice-za-odobrenje.component';

@NgModule({
  declarations: [ProfileComponent, ClanskeKarticeZaOdobrenjeComponent],
  imports: [
    CommonModule,
    UserManagmentRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class UserManagmentModule {}

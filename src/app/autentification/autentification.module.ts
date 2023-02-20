import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AutentificationRoutingModule } from "./autentification-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { AngularMaterialModule } from "../angular-material/angular-material.module";

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AutentificationRoutingModule,
    FormsModule,
    AngularMaterialModule,
  ],
})
export class AutentificationModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { CreateTrainingComponent } from "./create-training/create-training.component";
import { TrainingsRoutingModule } from "./trainings-routing.module";
import { TrainingsComponent } from "./trainings/trainings.component";


@NgModule({
  declarations: [
    CreateTrainingComponent,
    TrainingsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    TrainingsRoutingModule,
  ],
})
export class TrainingsModule {}

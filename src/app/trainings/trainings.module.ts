import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { TrainingsRoutingModule } from "./trainings-routing.module";
import { TrainingsComponent } from "./trainings/trainings.component";
import { TrainingComponent } from "./training/training.component";
import { AddTrainingsScheduleComponent } from './add-trainings-schedule/add-trainings-schedule.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { CreateTrainingComponent } from "./create-training/create-training.component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ReservationComponent } from './reservation/reservation.component';


@NgModule({
  declarations: [
    CreateTrainingComponent,
    TrainingsComponent,
    TrainingComponent,
    AddTrainingsScheduleComponent,
    EditTrainingComponent,
    ShoppingCartComponent,
    ReservationComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    TrainingsRoutingModule,
  ],
})
export class TrainingsModule {}

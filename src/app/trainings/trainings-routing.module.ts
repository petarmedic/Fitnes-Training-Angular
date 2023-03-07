import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin } from "../core/guards/admin.guard";
import { AuthenticatedGuard } from "../core/guards/authenticated.guard";
import { AddTrainingsScheduleComponent } from "./add-trainings-schedule/add-trainings-schedule.component";
import { CreateTrainingComponent } from "./create-training/create-training.component";
import { EditTrainingComponent } from "./edit-training/edit-training.component";
import { TrainingComponent } from "./training/training.component";
import { TrainingsComponent } from "./trainings/trainings.component";

const routes: Routes = [
  {
    path: "create",
    component: CreateTrainingComponent,
    canActivate: [Admin],
  },
  {
    path: "all",
    component: TrainingsComponent,
    canActivate: [Admin],
  },
  {
    path: "training/:id",
    component: TrainingComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: "add-trainings-schedule/:id",
    component: AddTrainingsScheduleComponent,
    canActivate: [Admin],
  },
  {
    path: "edit/:id",
    component: EditTrainingComponent,
    canActivate: [Admin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingsRoutingModule {}

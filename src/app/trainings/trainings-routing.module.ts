import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin } from "../core/guards/admin.guard";
import { AuthenticatedGuard } from "../core/guards/authenticated.guard";
import { CreateTrainingComponent } from "./create-training/create-training.component";
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingsRoutingModule {}

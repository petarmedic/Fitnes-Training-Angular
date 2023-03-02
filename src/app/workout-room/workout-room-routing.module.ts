import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin } from "../core/guards/admin.guard";
import { CreateWorkoutRoomComponent } from "./create-workout-room/create-workout-room.component";
import { WorkoutRoomsComponent } from "./workout-rooms/workout-rooms.component";


const routes: Routes = [
  {
    path: "all",
    component: WorkoutRoomsComponent,
    canActivate: [Admin],
  },
  {
    path: "create",
    component: CreateWorkoutRoomComponent,
    canActivate: [Admin],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutRoomRoutingModule {}

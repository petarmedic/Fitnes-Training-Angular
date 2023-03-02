import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { FormsModule } from "@angular/forms";
import { WorkoutRoomRoutingModule } from "./workout-room-routing.module";
import { CreateWorkoutRoomComponent } from "./create-workout-room/create-workout-room.component";
import { WorkoutRoomsComponent } from "./workout-rooms/workout-rooms.component";


@NgModule({
  declarations: [CreateWorkoutRoomComponent, WorkoutRoomsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    WorkoutRoomRoutingModule,
  ],
})
export class WorkoutRoomModule {}
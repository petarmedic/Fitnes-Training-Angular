import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { CREATE_WORKOUTROOM } from 'src/app/graphql.queries';

@Component({
  selector: 'app-create-workout-room',
  templateUrl: './create-workout-room.component.html',
  styleUrls: ['./create-workout-room.component.css']
})
export class CreateWorkoutRoomComponent implements OnInit {
  name: string;
  capacity: number;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
  }

  kreirajSalu() {
    this.apollo
      .mutate({
        mutation: CREATE_WORKOUTROOM,
        variables: {
          capacity: this.capacity,
          name: this.name,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Woorkout Room succesfully created!");
          this.router.navigate(["workout-room/all"]);
        },
        (error) => {
          this.toastr.error("Error add workout room!");
        }
      );
  }
}

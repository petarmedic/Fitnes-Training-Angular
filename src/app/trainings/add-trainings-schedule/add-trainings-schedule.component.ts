import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { CREATE_TRAINING_SCHEDULE, WORKOUT_ROOMS } from 'src/app/graphql.queries';

@Component({
  selector: 'app-add-trainings-schedule',
  templateUrl: './add-trainings-schedule.component.html',
  styleUrls: ['./add-trainings-schedule.component.css']
})
export class AddTrainingsScheduleComponent implements OnInit {

  workoutRooms: any = [];
  workoutRoomId: number;
  trainingId: number;
  dateTime: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.trainingId = +id;
    this.apollo
      .watchQuery<any>({
        query: WORKOUT_ROOMS,
      })
      .valueChanges.subscribe(
        (response) => {
          console.log(response.data);
          const res = response.data.workoutRooms;
          this.workoutRooms = res;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  createTrainingSchedule() {
    this.apollo
      .mutate({
        mutation: CREATE_TRAINING_SCHEDULE,
        variables: {
          trainingId: this.trainingId,
          workoutRoomId: this.workoutRoomId,
          dateTime: this.dateTime,
          
        },
      })
      .subscribe(
        (data) => {
          console.log(data["data"].createTrainingSchedule);
          if (data["data"].createTrainingSchedule) {
            this.toastr.success("Create!");
            this.router.navigate(["trainings/all"]);
          } else {
            this.toastr.error(
              "Term creation error, past tense or overlapping!"
            );
          }
        },
        (error) => {
          this.toastr.error("Error create training schedule!");
        }
      );
  }


}

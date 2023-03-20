import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { DELETE_WORKOUT_ROOM, WORKOUT_ROOMS } from 'src/app/graphql.queries';

@Component({
  selector: 'app-workout-rooms',
  templateUrl: './workout-rooms.component.html',
  styleUrls: ['./workout-rooms.component.css']
})
export class WorkoutRoomsComponent implements OnInit {
  workoutRooms: any = null;
  displayedColumns: string[] = [
    "capacity",
    "name",
    "delete",
  ];
  dataSource = new MatTableDataSource<any>(this.workoutRooms);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: WORKOUT_ROOMS,
      })
      .valueChanges.subscribe(
        (response) => {
          console.log(response.data);
          const res = response.data.workoutRooms;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  delete(id) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: DELETE_WORKOUT_ROOM,
        variables: {
          idWorkoutRoom: id,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Deleted!");
          this.workoutRooms = this.workoutRooms.filter((k) => k.id !== id);
          this.dataSource = new MatTableDataSource<any>(this.workoutRooms);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error(
            "It is not possible to delete the woorkout room to which trainings or appointments are connected!"
          );
        }
      );
  }


}

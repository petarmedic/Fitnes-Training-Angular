import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  @ViewChild('table', { static: true }) table: MatTable<any>;
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: WORKOUT_ROOMS,
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.workoutRooms;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.data = this.workoutRooms; // Refresh the MatTableDataSource

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
          this.dataSource.data = this.workoutRooms;
          this.dataSource = new MatTableDataSource<any>(this.workoutRooms);
          this.dataSource.paginator = this.paginator;
          this.dataSource._updateChangeSubscription();
        },
        (error) => {
          this.toastr.error(
            "It is not possible to delete the woorkout room to which trainings or appointments are connected!"
          );
        }
      );
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this?')) {
      // if the user has confirmed the deletion
      this.delete(id);
      setTimeout(() => {
        location.reload();
      }, 500);
    } else {
      // if the user has not confirmed the deletion
      return;
    }
  }


}

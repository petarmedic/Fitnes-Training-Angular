import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { VIEW_RESERVATION } from 'src/app/graphql.queries';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservations: any = null;
  displayedColumns: string[] = ["dateTime", "workoutRoom", "training"];
  dataSource = new MatTableDataSource<any>(this.reservations);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    const rezervacijeReload = localStorage.getItem("reservationReload");
    if (!rezervacijeReload) {
      localStorage.setItem("reservationReload", "loaded");
      location.reload();
    } else {
      localStorage.removeItem("reservationReload");
    }

    this.apollo
      .watchQuery<any>({
        query: VIEW_RESERVATION,
        variables: {
          shoppingCart: false,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          console.log(response.data);
          const res = response.data.viewReservation;

          this.reservations = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

}

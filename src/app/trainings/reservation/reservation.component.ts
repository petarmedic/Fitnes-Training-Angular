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
  discountPrice: number;
  reservations: any = null;
  displayedColumns: string[] = ["dateTime", "workoutRoom", "training", "calculatedValue"];
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
          const res = response.data.viewReservation;
          this.reservations = res;
          res.forEach(reservation => {
          });

         this.reservations = this.reservations.map((element) => {
          return {
            ...element,
            calculatedValue: this.calculateValue(element)
          };
        });
        this.dataSource = new MatTableDataSource<any>(this.reservations);

          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  calculateValue(element: any) {
    const discountPercent = element.point * 5;
    const discountedPrice = element.trainingSchedule.training.prices * (1 - discountPercent / 100);
    return discountedPrice.toFixed(2); // round the value to two decimal places
  }
  

}

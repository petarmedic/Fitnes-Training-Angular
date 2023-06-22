import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { PROCESS_SHOPPING_CART, VIEW_RESERVATION } from 'src/app/graphql.queries';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  reservation: any = null;
  displayedColumns: string[] = ["dateTime", "workoutRoom", "training"];
  dataSource = new MatTableDataSource<any>(this.reservation);
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    const shoppingcartReload = localStorage.getItem("shoppingcartReload");
    if (!shoppingcartReload) {
      localStorage.setItem("shoppingcartReload", "loaded");
      location.reload();
    } else {
      localStorage.removeItem("shoppingcartReload");
    }

    console.log("oninit");
    this.apollo
      .watchQuery<any>({
        query: VIEW_RESERVATION,
        variables: {
          shoppingCart: true,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.viewReservation;

          this.reservation = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }


  process(accepted) {
    const confirmed = confirm("Are you sure you want to continue?");
    
    if (confirmed) {
      this.apollo
        .mutate({
          mutation: PROCESS_SHOPPING_CART,
          variables: {
            accepted: accepted,
          },
        })
        .subscribe(
          (data) => {
            this.toastr.success("Proces!");
            localStorage.removeItem("shoppingcartReload");
            localStorage.removeItem("reservationReload");
            setTimeout(() => {
              location.reload();
            }, 1000);

          },
          (error) => {
            this.toastr.error("The action could not be performed!");
          }
        );
    }
  }
  


}

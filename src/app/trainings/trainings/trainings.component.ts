import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { TRAININGS } from 'src/app/graphql.queries';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  trainings: any = null;
  sort: string = "";
  priceFrom: number = 0;
  priceTo: number = 0;
  filter: string = "";
  sortovi: any = [
    { naziv: "Name", sort: "name" },
    { naziv: "Prices", sort: "prices" },
    { naziv: "Description", sort: "description" },
    { naziv: "Training level", sort: "levelTraining" },
    { naziv: "Training duration", sort: "trainingDuration" },
  ];
  displayedColumns: string[] = [
    "prices",
    "name",
    "levelTraining",
    "description",
    "trainingDuration",
    "view",
    "edit",
  ];

  dataSource = new MatTableDataSource<any>(this.trainings);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: TRAININGS,
        variables: {
          filter: this.filter,
          priceFrom: this.priceFrom,
          priceTo: this.priceTo,
          sort: this.sort,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.trainings;
          console.log(res);
          this.trainings = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  filtriraj() {
    this.apollo
      .watchQuery<any>({
        query: TRAININGS,
        variables: {
          filter: this.filter,
          priceFrom: this.priceFrom,
          priceTo: this.priceTo,
          sort: this.sort,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.trainings;
          console.log(res);
          this.trainings = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

}

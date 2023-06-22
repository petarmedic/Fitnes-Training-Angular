import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { TRAININGS } from 'src/app/graphql.queries';
import { LocalStorageService } from 'src/app/shared/service/local-storage-service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  trainings: any = null;
  sort: string = "";
  role: String;
  roleUser: Boolean = false;
  roleAdmin: Boolean = false;
  priceFrom: number = null;
  priceTo: number = null;
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
    "actions",
  ];

  dataSource = new MatTableDataSource<any>(this.trainings);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.role = JSON.parse(`${localStorage.getItem("role")}`)[0];
    if(this.role ==="USER") {
      this.roleUser = true;
    } else if (this.role=== "ADMIN") {
      this.roleAdmin = true;
    }

    // if(this.role === 'ADMIN'){
    //   this.displayedColumns.push('edit');
    // }
    this.apollo
      .watchQuery<any>({
        query: TRAININGS,
        variables: {
          filter: this.filter,
          priceFrom: this.priceFrom !== null ? this.priceFrom : 0,
          priceTo: this.priceTo !== null ? this.priceTo : 0,
          sort: this.sort,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.trainings;
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
          priceFrom: this.priceFrom !== null ? this.priceFrom : 0,
          priceTo: this.priceTo !== null ? this.priceTo : 0,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.trainings;
          this.trainings = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  view(id) {
    this.router.navigate(["trainings/training/" + id]);
  }

  editTrainings(id) {
    this.router.navigate(["trainings/edit/" + id]);
  }

  addTrainingsSchedule(id) {
    this.router.navigate(["trainings/add-trainings-schedule/" + id]);
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

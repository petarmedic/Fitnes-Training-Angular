import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { SHOPPING_CART, TRAINING } from 'src/app/graphql.queries';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  idTraining: number;
  prices: number;
  levelTraining: string;
  trainingDuration: number;
  trainer: string;
  trainingKind: string;
  description: string;
  name: string;
  photo: string;
  trainingSchedules: any = [];
  bodovi: any = [1, 2, 3, 4, 5];
  bod: any = 0;

  displayedColumns: string[] = ["dateTime", "workoutRoom", "reservation"];
  dataSource = new MatTableDataSource<any>(this.trainingSchedules);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.idTraining = +id;
    this.apollo
      .watchQuery<any>({
        query: TRAINING,
        variables: {
          idTraining: this.idTraining,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.training;
          console.log(response.data);
          this.prices = res.prices;
          this.levelTraining = res.levelTraining;
          this.trainingDuration = res.trainingDuration;
          this.trainer = res.trainer;
          this.trainingKind = res.trainingKind;
          this.description = res.description;
          this.name = res.name;
          this.photo = res.photo;
          this.trainingSchedules = res.trainingSchedules;
          console.log(res.trainingSchedules);
          this.dataSource = new MatTableDataSource<any>(
            res.trainingSchedules
          );
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  viewComment() {
    this.router.navigate(["comments/comments-for-training/" + this.idTraining]);
  }

  reservation(id) {
    this.apollo
      .mutate({
        mutation: SHOPPING_CART,
        variables: {
          idTrainingSchedule: id,
          numberPoint: this.bod,
        },
      })
      .subscribe(
        (data) => {
          if (data["data"].shoppingCart) {
            this.toastr.success("Added to shopping cart!");
          } else {
            this.toastr.error("Training has already been added to shopping cart!");
          }

          localStorage.removeItem("shoppingcartReload");
          localStorage.removeItem("reservationReload");
        },
        (error) => {
          this.toastr.error("Booking error!");
        }
      );
  }

}

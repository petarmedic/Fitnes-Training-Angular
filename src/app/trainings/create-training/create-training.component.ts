import { Component, OnInit } from '@angular/core';
import { CREATE_TRAINING } from 'src/app/graphql.queries';
import { Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {
  prices: number;
  levelTraining: string;
  trainingDuration: number;
  trainer: string;
  trainingKind: string;
  description: string;
  name: string;
  photo: string;

  constructor(private toastr: ToastrService, private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  
  createTraining() {
    this.apollo
      .mutate({
        mutation: CREATE_TRAINING,
        variables: {
          prices: this.prices,
          levelTraining: this.levelTraining,
          trainingDuration: this.trainingDuration,
          trainer: this.trainer,
          trainingKind: this.trainingKind,
          description: this.description,
          name: this.name,
          photo: this.photo,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Created!");
          setTimeout(() => {
            location.reload();
          }, 1000);
          this.router.navigate(["trainings/all"]);
        },
        (error) => {
          this.toastr.error("Error add training!");
        }
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { EDIT_TRAINING, TRAINING } from 'src/app/graphql.queries';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css']
})
export class EditTrainingComponent implements OnInit {

  idTraining: number;
  prices: number;
  levelTraining: string;
  trainingDuration: number;
  trainer: string;
  trainingKind: string;
  description: string;
  name: string;
  photo: string;

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
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  editTraining() {
    this.apollo
      .mutate({
        mutation: EDIT_TRAINING,
        variables: {
          idTraining: this.idTraining,
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
          this.toastr.success("Successfully!");
        },
        (error) => {
          this.toastr.error("Error when changing training!");
        }
      );
  }


}

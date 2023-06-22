import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { COMMENT_FOR_TRAININGS, CREATE_COMMENT } from 'src/app/graphql.queries';

@Component({
  selector: 'app-comments-for-training',
  templateUrl: './comments-for-training.component.html',
  styleUrls: ['./comments-for-training.component.css']
})
export class CommentsForTrainingComponent implements OnInit {
  comments: any = null;
  displayedColumns: string[] = ["rate", "text", "datePost", "user"];
  dataSource = new MatTableDataSource<any>(this.comments);
  rating: number[] = [1, 2, 3, 4, 5];
  rate: any;
  text: any;
  idTraining: any;
  anonymous: boolean = false;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.idTraining = +id;
    this.apollo
      .watchQuery<any>({
        query: COMMENT_FOR_TRAININGS,
        variables: {
          idTraining: id,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.commentForTraining;
          this.comments = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  comment() {
  this.apollo
  .mutate({
    mutation: CREATE_COMMENT,
    variables: {
      idTraining: this.idTraining,
      rate: this.rate,
      text: this.text,
      anonymous: this.anonymous ? "ANONYMOUS" : "PUBLIC",
    },
  })
  .subscribe(
    (data) => {
      this.toastr.success("Comment sent for processing!");
    },
    (error) => {
      this.toastr.error("Error add comment!");
    }
  );
}

}

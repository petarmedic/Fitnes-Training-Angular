import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { COMMENT_FOR_APPROVAL, PROCCES_COMMENT } from 'src/app/graphql.queries';

@Component({
  selector: 'app-comments-for-approval',
  templateUrl: './comments-for-approval.component.html',
  styleUrls: ['./comments-for-approval.component.css']
})
export class CommentsForApprovalComponent implements OnInit {
  comments: any = null;

  displayedColumns: string[] = [
    "rate",
    "text",
    "datePost",
    "user",
    "accept",
    "reject",
  ];

  dataSource = new MatTableDataSource<any>(this.comments);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: COMMENT_FOR_APPROVAL,
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.commentForApproval;
          console.log(res);
          this.comments = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }


  process(id, process) {
    this.apollo
      .mutate({
        mutation: PROCCES_COMMENT,
        variables: {
          idComment: id,
          approved: process,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Processed!");
          this.comments = this.comments.filter((k) => k.id !== id);
          this.dataSource = new MatTableDataSource<any>(this.comments);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

}

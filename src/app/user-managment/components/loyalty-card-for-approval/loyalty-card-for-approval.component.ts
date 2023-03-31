import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { PROCESS_REQUEST_FOR_CARD, REQUESR_FOR_CARD } from 'src/app/graphql.queries';

@Component({
  selector: 'app-loyalty-card-for-approval',
  templateUrl: './loyalty-card-for-approval.component.html',
  styleUrls: ['./loyalty-card-for-approval.component.css']
})
export class LoyaltyCardForApprovalComponent implements OnInit {
  cards: any = null;
  displayedColumns: string[] = ["name", "lastName", "acept", "reject"];
  dataSource = new MatTableDataSource<any>(this.cards);
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: REQUESR_FOR_CARD,
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.requestForCard;
          console.log(res);
          this.cards = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  process(id, process) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: PROCESS_REQUEST_FOR_CARD,
        variables: {
          idUser: +id,
          process: process,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Obradjeno!");
          this.cards = this.cards.filter((k) => k.id !== id);
          this.dataSource = new MatTableDataSource<any>(this.cards);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

}

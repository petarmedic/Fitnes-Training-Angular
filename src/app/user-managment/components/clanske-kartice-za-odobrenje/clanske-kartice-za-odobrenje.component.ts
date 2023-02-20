import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";
import {
  OBRADI_ZAHTEV_ZA_KARTICU,
  ZAHTEVI_ZA_KARTICU,
} from "src/app/graphql.queries";

@Component({
  selector: "app-clanske-kartice-za-odobrenje",
  templateUrl: "./clanske-kartice-za-odobrenje.component.html",
  styleUrls: ["./clanske-kartice-za-odobrenje.component.css"],
})
export class ClanskeKarticeZaOdobrenjeComponent implements OnInit {
  kartice: any = null;
  displayedColumns: string[] = ["ime", "prezime", "potrvrdi", "odbij"];
  dataSource = new MatTableDataSource<any>(this.kartice);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: ZAHTEVI_ZA_KARTICU,
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.zahteviZaKarticu;
          console.log(res);
          this.kartice = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  obradi(id, obrada) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: OBRADI_ZAHTEV_ZA_KARTICU,
        variables: {
          idKorisnik: +id,
          obrada: obrada,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Obradjeno!");
          this.kartice = this.kartice.filter((k) => k.id !== id);
          this.dataSource = new MatTableDataSource<any>(this.kartice);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }
}

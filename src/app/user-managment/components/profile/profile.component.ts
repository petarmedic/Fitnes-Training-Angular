import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/models/user.model";
import { PROFIL, ZAHTEVAJ_KARTICU } from "src/app/graphql.queries";
import { Apollo } from "apollo-angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  loggedInUserEmail: string;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: PROFIL,
      })
      .valueChanges.subscribe(
        (response) => {
          console.log(response.data);
          this.user = response.data.profil;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
    this.loggedInUserEmail = localStorage.getItem("email");
  }

  goBack() {
    this._location.back();
  }

  zahtevajKarticu() {
    this.apollo
      .watchQuery<any>({
        query: ZAHTEVAJ_KARTICU,
      })
      .valueChanges.subscribe(
        (response) => {
          this.toastr.success(response.data.zahtevajKarticu.poruka);
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }
}

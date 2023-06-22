import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/models/user.model";
import { PROFIL, REQUEST_CARD } from "src/app/graphql.queries";
import { Apollo } from "apollo-angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  roleUser: Boolean = false;
  roleAdmin: Boolean = false;
  role: String;
  user: User = new User();
  loyaltyCardPoint: number;
  loggedInUserEmail: string;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.role = JSON.parse(`${localStorage.getItem("role")}`)[0];
    if(this.role ==="USER") {
      this.roleUser = true;
    } else if (this.role=== "ADMIN") {
      this.roleAdmin = true;
    }
    this.apollo
      .watchQuery<any>({
        query: PROFIL,
      })
      .valueChanges.subscribe(
        (response) => {
          this.user = response.data.profil;
          this.loyaltyCardPoint = response.data.profil.loyaltyCard.point
          this.loyaltyCardPoint = Math.max(0, response.data.profil.loyaltyCard.point);
          console.log(this.loyaltyCardPoint);
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


  requestCard() {
    this.apollo
      .watchQuery<any>({
        query: REQUEST_CARD,
      })
      .valueChanges.subscribe(
        (response) => {
       //   this.toastr.success(response.data.requestCard.message);
          if(response.data.requestCard.message === "Successfully"){
            this.toastr.success(response.data.requestCard.message);
          }if(response.data.requestCard.message === "You already have a card or have already sent a request"){
            this.toastr.error(response.data.requestCard.message);
          }
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }
}

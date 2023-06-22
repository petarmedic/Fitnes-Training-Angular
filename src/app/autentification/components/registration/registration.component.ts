import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/models/user.model";
import { Apollo } from "apollo-angular";
import { REGISTER } from "src/app/graphql.queries";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  user: User = new User();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {}

  isValidEmail() {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.user.email).toLowerCase());
  }

  isValidPhone(phone) {
    if (!phone) {
      return true;
    }
    const re = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{3}/;
    return re.test(String(phone));
  }

  validate() {
    if (
      !this.user.name ||
      !this.user.lastName ||
      !this.user.email ||
      !this.user.password ||
      !this.user.username
    ) {
      this.toastr.error(
        "Name, Last Name, Email, Phone Number, Username and password are required fields!"
      );
      return false;
    } else if (this.user.password.length < 5) {
      this.toastr.error("The password must contain at least 5 characters!");
      return false;
    } else if (this.user.password != this.user.password2) {
      this.toastr.error("Passwords do not match!");
      return false;
    } else if (!this.isValidEmail()) {
      this.toastr.error("The email is not valid!");
      return false;
    } else if (!this.isValidPhone(this.user.phoneNumber)) {
      this.toastr.error("The phone number is not valid!");
      return false;
    }
    return true;
  }

  register() {
    if (this.validate()) {
      localStorage.clear();

      this.apollo
        .mutate({
          mutation: REGISTER,
          variables: {
            dateBirth: this.user.dateBirth,
            adress: this.user.adress,
            password: this.user.password,
            name: this.user.name,
            lastName: this.user.lastName,
            username: this.user.username,
            phoneNumber: this.user.phoneNumber,
            email: this.user.email,
          },
        })
        .subscribe(
          (data) => {
            this.toastr.success(
              "Successful registration!"
            );
            this.router.navigate(["/auth"]);
          },
          (error) => {
            this.toastr.error("there was an error sending the query", error);
          }
        );
    }
  }
}

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
        "Ime, prezime, email, telefon, korisnickoIme i lozinka su obavezna polja!"
      );
      return false;
    } else if (this.user.password.length < 5) {
      this.toastr.error("Lozinka mora da sadrži minumum 5 karaktera!");
      return false;
    } else if (this.user.password != this.user.password2) {
      this.toastr.error("Lozinke se ne podudaraju!");
      return false;
    } else if (!this.isValidEmail()) {
      this.toastr.error("Email nije validan!");
      return false;
    } else if (!this.isValidPhone(this.user.phoneNumber)) {
      this.toastr.error("Telefon nije validan!");
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
            datumRodjenja: this.user.dateBirth,
            adresa: this.user.adress,
            lozinka: this.user.password,
            ime: this.user.name,
            prezime: this.user.lastName,
            korisnickoIme: this.user.username,
            brojTelefona: this.user.phoneNumber,
            email: this.user.email,
          },
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.toastr.success(
              "Uspešna registracija! Administracija ce aktivirati nalog u roku od 24h."
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

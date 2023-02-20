import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "src/app/shared/service/local-storage-service";
import { LOGIN } from "src/app/graphql.queries";
import { Apollo } from "apollo-angular";
import { error } from "console";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usernameInput: string;
  passwordInput: string;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit() {}

  onSubmit() {
    localStorage.clear();
    if (this.usernameInput && this.passwordInput) {
      this.apollo
        .watchQuery<any>({
          query: LOGIN,
          variables: {
            username: this.usernameInput,
            password: this.passwordInput,
          },
        })
        .valueChanges.subscribe(
          (response) => {
            const res = response.data.login;
            console.log(res);
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.username);
            localStorage.setItem("email", res.email);
            localStorage.setItem("role", JSON.stringify(res.authorities));
            this.storageService.roleChanged(JSON.stringify(res.authorities));
            this.toastr.success("Uspešan login!");
            this.router.navigate(["home"]);
          },
          (error) => {
            this.toastr.error("there was an error sending the query", error);
          }
        );
    } else {
      this.toastr.error("Morate uneti username i šifru!");
    }
  }
}

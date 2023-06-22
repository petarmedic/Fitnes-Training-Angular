import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
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
  role: String;
  roleUser: Boolean = false;
  roleAdmin: Boolean = false;
  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private storageService: LocalStorageService
  ) 
  { }

  ngOnInit() {
    this.role = JSON.parse(`${localStorage.getItem("role")}`)?.[0];
    if (this.role === "USER" || this.role === "ADMIN") {
      this.router.navigate(["/trainings/all"]);
    }else{
      this.router.navigate(["/auth"]);
    }
    if(this.role ==="USER") {
      this.roleUser = true;
    } else if (this.role=== "ADMIN") {
      this.roleAdmin = true;
    }
  }

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
            if (!res) {
              this.toastr.error("Unable to log in. The user has been blocked.");
              return;
            }
            console.log(res);
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.username);
            localStorage.setItem("email", res.email);
            localStorage.setItem("role", JSON.stringify(res.authorities));
            this.storageService.roleChanged(JSON.stringify(res.authorities));
            this.toastr.success("Successful login!");
            this.router.navigate(["/trainings/all"]);
          },
          (error) => {
            this.toastr.error("Enter the correct username and password!", error);
          }
        );
    } else {
      this.toastr.error("You must enter a username and password!");
    }
  }
}

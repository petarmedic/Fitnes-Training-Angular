import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LocalStorageService } from "../../service/local-storage-service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  mode = new FormControl("push");
  roleUser: Boolean = false;
  roleAdmin: Boolean = false;

  constructor(private storageService: LocalStorageService) {
    this.storageService.watchStorage().subscribe((role: string) => {
      this.roleUser = false;
      this.roleAdmin = false;

      if (role) {
        let authorities = JSON.parse(role);
        for (const auth of authorities) {
          if (auth === "USER") {
            this.roleUser = true;
          } else if (auth === "ADMIN") {
            this.roleAdmin = true;
          }
        }
      }
      console.log("listener" + this.roleUser + " " + this.roleAdmin);
    });
  }

  ngOnInit() {
    let authorities = JSON.parse(`${localStorage.getItem("role")}`);
    for (const auth of authorities) {
      if (auth === "USER") {
        this.roleUser = true;
      } else if (auth === "ADMIN") {
        this.roleAdmin = true;
      }
    }
    console.log(this.roleUser + " " + this.roleAdmin);
  }

  logout() {
    localStorage.clear();
    this.storageService.logout();
    this.roleUser = false;
    this.roleAdmin = false;
  }
}

import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
  hideNavigation = false;
  showWorkoutRoomButtons: boolean = false; // add

  constructor(private storageService: LocalStorageService,
    private route: ActivatedRoute) {
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

    });
  }

  ngOnInit() {
    this.hideNavigation = this.route.snapshot.data.hideNavigation || false;
    let authorities = JSON.parse(`${localStorage.getItem("role")}`);
    if (authorities && Array.isArray(authorities)) {
    for (const auth of authorities) {
      if (auth === "USER") {
        this.roleUser = true;
      } else if (auth === "ADMIN") {
        this.roleAdmin = true;
      }
    }
  }
  }

  logout() {
    localStorage.clear();
    this.storageService.logout();
    this.roleUser = false;
    this.roleAdmin = false;
  }
}

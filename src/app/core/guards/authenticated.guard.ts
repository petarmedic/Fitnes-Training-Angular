import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<any> {
    console.log("AuthenticatedGuard");
    let roleUser = false;
    let roleAdmin = false;

    let authorities = JSON.parse(`${localStorage.getItem("role")}`);
    console.log(authorities);
    for (const auth of authorities) {
      console.log(auth);
      if (auth === "USER") {
        console.log("setting");
        roleUser = true;
      } else if (auth === "ADMIN") {
        roleAdmin = true;
      }
    }
    if (roleUser || roleAdmin) {
      console.log("true | ");
      return of(true);
    }
    console.log("false # ");
    this.router.navigate(["/auth"]);
    return of(false);
  }
}

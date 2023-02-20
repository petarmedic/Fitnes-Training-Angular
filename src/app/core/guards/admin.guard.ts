import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Admin implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<any> {
    let roleKorisnik = false;
    let roleAdmin = false;

    let authorities = JSON.parse(`${localStorage.getItem("role")}`);
    for (const auth of authorities) {
      if (auth === "USER") {
        roleKorisnik = true;
      } else if (auth === "ADMIN") {
        roleAdmin = true;
      }
    }
    console.log(roleAdmin);
    if (roleAdmin) {
      return of(true);
    }
    this.router.navigate(["/auth"]);
    return of(false);
  }
}

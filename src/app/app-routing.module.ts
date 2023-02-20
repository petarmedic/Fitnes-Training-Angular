import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((mod) => mod.DashboardModule),
  },

  {
    path: "auth",
    loadChildren: () =>
      import("./autentification/autentification.module").then(
        (mod) => mod.AutentificationModule
      ),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./user-managment/user-managment.module").then(
        (mod) => mod.UserManagmentModule
      ),
  },

  { path: "page-not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

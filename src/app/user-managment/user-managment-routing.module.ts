import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedGuard } from "../core/guards/authenticated.guard";
import { Admin } from "../core/guards/admin.guard";
import { ProfileComponent } from "./components/profile/profile.component";
import { ClanskeKarticeZaOdobrenjeComponent } from "./components/clanske-kartice-za-odobrenje/clanske-kartice-za-odobrenje.component";

const routes: Routes = [
  {
    path: "user",
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: "clanske-kartice-za-odobrenje",
    component: ClanskeKarticeZaOdobrenjeComponent,
    canActivate: [Admin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagmentRoutingModule {}

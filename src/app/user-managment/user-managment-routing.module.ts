import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedGuard } from "../core/guards/authenticated.guard";
import { Admin } from "../core/guards/admin.guard";
import { ProfileComponent } from "./components/profile/profile.component";
import { AllUsersComponent } from "./components/all-users/all-users.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { LoyaltyCardForApprovalComponent } from "./components/loyalty-card-for-approval/loyalty-card-for-approval.component";

const routes: Routes = [
  {
    path: "user",
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: "loyalty-card-for-approval",
    component: LoyaltyCardForApprovalComponent,
    canActivate: [Admin],
  },
  {
    path: "all-users",
    component: AllUsersComponent,
    canActivate: [Admin],
  },
  {
    path: "edit-user/:id",
    component: EditUserComponent,
    canActivate: [Admin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagmentRoutingModule {}

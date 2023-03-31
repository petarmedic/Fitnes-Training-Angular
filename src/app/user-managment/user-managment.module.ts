import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserManagmentRoutingModule } from "./user-managment-routing.module";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { FormsModule } from "@angular/forms";
import { ProfileComponent } from "./components/profile/profile.component";
import { AllUsersComponent } from './components/all-users/all-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoyaltyCardForApprovalComponent } from './components/loyalty-card-for-approval/loyalty-card-for-approval.component';

@NgModule({
  declarations: [ProfileComponent, AllUsersComponent, EditUserComponent, LoyaltyCardForApprovalComponent],
  imports: [
    CommonModule,
    UserManagmentRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class UserManagmentModule {}

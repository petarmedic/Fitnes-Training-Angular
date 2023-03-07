import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin } from "../core/guards/admin.guard";
import { AuthenticatedGuard } from "../core/guards/authenticated.guard";
import { CommentsForApprovalComponent } from "./comments-for-approval/comments-for-approval.component";
import { CommentsForTrainingComponent } from "./comments-for-training/comments-for-training.component";


const routes: Routes = [
  {
    path: "comments-for-approval",
    component: CommentsForApprovalComponent,
    canActivate: [Admin],
  },
  {
    path: "comments-for-training/:id",
    component: CommentsForTrainingComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KomentariRoutingModule {}
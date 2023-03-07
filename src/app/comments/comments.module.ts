import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { FormsModule } from "@angular/forms";
import { KomentariRoutingModule } from "./comments-routing.module";
import { CommentsForApprovalComponent } from "./comments-for-approval/comments-for-approval.component";
import { CommentsForTrainingComponent } from "./comments-for-training/comments-for-training.component";

@NgModule({
  declarations: [CommentsForApprovalComponent, CommentsForTrainingComponent],
  imports: [
    CommonModule,
    KomentariRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class CommentsModule {}
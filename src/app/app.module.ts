import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { NgxSpinnerService } from "ngx-spinner";
import { GraphQLModule } from "./graphql.module";
import { WorkoutRoomModule } from "./workout-room/workout-room.module";
import { TrainingsModule } from "./trainings/trainings.module";
import { CommentsModule } from "./comments/comments.module";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-center",
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    WorkoutRoomModule,
    CoreModule,
    GraphQLModule,
    TrainingsModule,
    CommentsModule,
  ],
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

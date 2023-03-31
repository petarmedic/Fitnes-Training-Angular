import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoreModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { NavigationComponent } from './components/navigation/navigation.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule, AngularMaterialModule, FormsModule, RouterModule, ReactiveFormsModule, CoreModule
  ],
  exports:[NavigationComponent]
})
export class SharedModule { }

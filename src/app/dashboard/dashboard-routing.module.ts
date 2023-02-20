import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../core/guards/authenticated.guard';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [{ path: '', component: HomePageComponent, canActivate: [AuthenticatedGuard], }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

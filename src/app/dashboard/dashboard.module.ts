
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';

import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerModule } from 'angular-calendar-scheduler';

import { AppService } from '../dashboard/components/app.service';

import * as moment from 'moment';
import { FormsModule } from '@angular/forms';

import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    // CalendarModule
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
  ],
  providers: [
    AppService,
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MOMENT, useValue: moment }
  ]
})
export class DashboardModule { }

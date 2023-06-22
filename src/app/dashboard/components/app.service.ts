import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    CalendarSchedulerEvent,
    CalendarSchedulerEventStatus,
    CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import { Apollo } from 'apollo-angular';
import {
    addDays,
    startOfHour,
    addHours,
    subHours,
    setHours,
    subMinutes,
    addMinutes,
    startOfDay,
    setMinutes
} from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { VIEW_RESERVATION } from 'src/app/graphql.queries';

@Injectable()
export class AppService {
    reservations: any;
    events: any;
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private apollo: Apollo
      ) { }
      
      getEvents(actions: CalendarSchedulerEventAction[]): Promise<CalendarSchedulerEvent[]> {
        return new Promise((resolve, reject) => {
          this.apollo
            .watchQuery<any>({
              query: VIEW_RESERVATION,
              variables: {
                shoppingCart: false,
              },
            })
            .valueChanges.subscribe(
              (response) => {
                const res = response.data.viewReservation;
                
                // fill calendar from res
                const events = res.map((reservation) => {
                
                  return {
                    id: reservation.id,
                    
                    start: new Date(reservation.trainingSchedule.dateTime),
                    end: addMinutes(new Date(reservation.trainingSchedule.dateTime), reservation.trainingSchedule.training.trainingDuration),
                    title: reservation.trainingSchedule.training.name,
                    actions: actions,
                    isClickable: true,
                    color: { primary: "#ADD8E6" , secondary: "#ADD8E6"  },
                  };
                });
      
                resolve(events);
              },
              (error) => {
                reject(error);
              }
            );
        });
      }
      
      
}
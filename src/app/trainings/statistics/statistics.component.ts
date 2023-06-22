import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { STATISTICS } from 'src/app/graphql.queries';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit  {

  statistics: any = null;
  dateFrom: string = "";
  dateTo: string = "";

  displayedColumns: string[] = [
    "date",
    "numberReservation",
    "earnings",
    "trainer",
    "nameTraining",
  ];

  dataSource = new MatTableDataSource<any>(this.statistics);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort = MatSort;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {

    this.apollo
      .watchQuery<any>({
        query: STATISTICS,
        variables: {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.statistics;
          this.statistics = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
      
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }


  filter() {
    this.apollo
      .watchQuery<any>({
        query: STATISTICS,
        variables: {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.statistics;
          this.statistics = res;
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }



}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { ALL_USERS, DELETE_USER } from 'src/app/graphql.queries';
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  allUsers: any = null;

  displayedColumns: string[] = [
    "name",
    "lastName",
    "email",
    "adress",
    "phoneNumber",
    "dateBirth",
    "edit",
    "delete"
  ];

  dataSource = new MatTableDataSource<any>(this.allUsers);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: ALL_USERS,
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.allUsers;
          this.allUsers = res;
          console.log(response.data);
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }

  editUser(id) {
    this.router.navigate(["user/edit-user/" + id]);
  }

  deleteUser(id) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables: {
          idSala: id,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Delete!");
          this.allUsers = this.allUsers.filter((k) => k.id !== id);
          this.dataSource = new MatTableDataSource<any>(this.allUsers);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.toastr.error(
            "Error delete user!"
          );
        }
      );
  }


}

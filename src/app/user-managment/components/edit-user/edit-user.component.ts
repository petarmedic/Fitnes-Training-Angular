import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { EDIT_USER, USER } from 'src/app/graphql.queries';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  idUser: number;
  name: string;
  lastName: string;
  email: string;
  adress: string
  phoneNumber: string;
  dateBirth: string;
  username: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.idUser = +id;
    this.apollo
      .watchQuery<any>({
        query: USER,
        variables: {
          idUser: this.idUser,
        },
      })
      .valueChanges.subscribe(
        (response) => {
          const res = response.data.user;
          console.log(response.data);
          this.name = res.name;
          this.lastName = res.lastName;
          this.email = res.email;
          this.adress = res.adress;
          this.phoneNumber = res.phoneNumber;
          this.dateBirth = res.dateBirth;
          this.username = res.username;
        },
        (error) => {
          this.toastr.error("there was an error sending the query", error);
        }
      );
  }


  editUser() {
    this.apollo
      .mutate({
        mutation: EDIT_USER,
        variables: {
          idUser: this.idUser,
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          adress: this.adress,
          phoneNumber: this.phoneNumber,
          dateBirth: this.dateBirth,
          username: this.username,
        },
      })
      .subscribe(
        (data) => {
          this.toastr.success("Save!");
        },
        (error) => {
          this.toastr.error("Error edit user!");
        }
      );
  }


}

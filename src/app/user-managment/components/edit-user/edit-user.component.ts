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
    const isValidDateFormat = (dateString) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(dateString);
    };
    if (!isValidDateFormat(this.dateBirth)) {
      this.toastr.error("Invalid date format! Please use the format 'YYYY-MM-DD'.");
      return false;
    }
    const parts = this.dateBirth.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (month < 1 || month > 12) {
      this.toastr.error("Invalid month! Month must be between 1 and 12.");
      return false;
    }

    const maxDays = new Date(year, month, 0).getDate();
    if (day < 1 || day > maxDays) {
      this.toastr.error("Invalid day! Please provide a valid day for the given month and year.");
      return false;
    }
  
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      this.toastr.error("Invalid year! Year must be between 1900 and the current year.");
      return false;
    }

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
          setTimeout(() => {
            location.reload();
          }, 500);
        },
        (error) => {
          this.toastr.error("Error editing user!");
        }
      );
  }
  


}

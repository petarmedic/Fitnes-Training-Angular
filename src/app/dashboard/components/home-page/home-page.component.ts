import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  message: string;
  constructor() {}

  ngOnInit(): void {
    this.message =
      localStorage.getItem('changePass') === 'true'
        ? 'Morate promeniti password'
        : '';
  }
}

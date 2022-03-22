import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import Lottie from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService:AuthService) {
    defineLordIconElement(Lottie.loadAnimation);
   }

  ngOnInit(): void {
    // register lottie and define custom element
  }

}

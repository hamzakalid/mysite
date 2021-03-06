import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import Lottie from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService:AuthService,public translate:TranslateService) {
    defineLordIconElement(Lottie.loadAnimation);
   }

  ngOnInit(): void {
    // register lottie and define custom element
  }
  getCurrentLang(){
    return this.translate.currentLang;
  }
}

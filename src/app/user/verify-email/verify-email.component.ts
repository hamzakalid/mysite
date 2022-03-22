import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  isAbleToSendEmailAgen = true;
  email:string = "";
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.email;
  }


  sendEmail(){
    this.authService.SendVerificationMail();
    //Timer for 60 seconds
    this.isAbleToSendEmailAgen = false;

    setInterval(()=>{
      this.isAbleToSendEmailAgen = true;
    },6000);

  }
}

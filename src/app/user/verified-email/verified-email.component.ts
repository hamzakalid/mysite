import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verified-email',
  templateUrl: './verified-email.component.html',
  styleUrls: ['./verified-email.component.css']
})
export class VerifiedEmailComponent implements OnInit {
  isAbleToSendEmailAgen = true;
  successStatue= false;
  constructor(public authService:AuthService,private router:ActivatedRoute) { }
  // const mode = ;
  mode:string = ""
  lang:string = ""
  apiKey:string = ""
  oobCode:string = ""

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.lang = params['lang'];
      this.apiKey = params['apiKey'];
      this.oobCode = params['oobCode'];
    })
    let isTrue:Boolean =this.authService.handleVerifyEmail(this.oobCode);
    if(isTrue){
      this.successStatue = true;
    }else{
      this.successStatue =false;
    }
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

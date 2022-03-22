import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:FormControl= new FormControl('', [
    Validators.required, Validators.email

  ]);

  isSent = "false";

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.isSent = "loading";
    this.authService.ForgotPassword(this.email.value);
    this.email.reset();
    this.isSent = "true";
  }

}

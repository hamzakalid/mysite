import { LyTheme2, ThemeVariables } from '@alyle/ui';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

const STYLES = (_theme: ThemeVariables) => ({
  loginWithGoogle :{
    backgroundColor: "#33f",
    color: "#fff",
    width: "100%",
  },
  container:{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  form:{
    maxWidth:'500px',
    width: '100%',
    margin: 'auto',
  },
  textCenter:{textAlign: 'center !important'},

  textLeft:{textAlign: 'left !important'},
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly classes = this.theme.addStyleSheet(STYLES);

  profileForm = new FormGroup({

    email: new FormControl('', [
      Validators.required, Validators.email

    ]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)])

  });

  get username() {
    return this.profileForm.get('username')!;
  }

  get bio() {
    return this.profileForm.get('bio')!;
  }

  constructor(private theme: LyTheme2,public authService:AuthService) { }

  onSubmit() {

    this.authService.SignIn(this.profileForm.value.email, this.profileForm.value.password);

  }


  ngOnInit(): void {
  }

}

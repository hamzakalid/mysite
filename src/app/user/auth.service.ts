import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, Provider } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import {
  AuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  applyActionCode,
  updateCurrentUser,
 } from 'firebase/auth';
import { Subject } from 'rxjs';
import { User } from './auth.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public email:string = "";
  private authStatusListener = new Subject<boolean>();
  public currentUser:any;
  private currentUserListener  = new Subject<any>();
  public userState: any;
  API_LINK:string = 'http://localhost:5001/test-firebase-db-b2391/us-central1/app/api/auth';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http:HttpClient
  ) {

    this.afAuth.authState.subscribe(user => {

      if (user) {

        this.userState = user;
        this.authStatusListener.next(true);
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user')|| '{}');

      } else {

        localStorage.setItem('user', "");
        JSON.parse(localStorage.getItem('user') || '{}');

      }
    });
   }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getCurrentUserListener(){
    return this.currentUserListener.asObservable();
  }

   // Sigin Function
   SignIn(email:string, password:string) {
    //Signin To your account
    const auth = getAuth();

    signInWithEmailAndPassword(auth,email, password)
      .then((result:any) => {
        console.log(result.user);

        this.ngZone.run(() => {

          this.router.navigate(['/']);

        });

        this.SetUserData(result.user);

      }).catch((error) => {

        window.alert(error.message)

      });
  }


  // Signup Function
  SignUp(email:string, password:string) {

    const auth = getAuth();

    createUserWithEmailAndPassword(auth,email, password)
      .then((result:any) => {
        //Sen Email Verification
        this.email = email;
        this.SendVerificationMail();
        //Save the Data
        this.SetUserData(result.user);


      }).catch((error) => {

        window.alert(error.message)

      })
  }

  SendVerificationMail() {
    // Send  a Code to verify the email
    var actionCodeSettings = {
      // url with the Id
      url: 'https://localhost:4200/finishSignUp?cartId=1234',
    }

    return this.afAuth.currentUser.then((user:any) => {user.sendEmailVerification()})
    .then(() => {

      this.router.navigate(['email-verification']);

    })

  }

  // This Function if the user foget his password
  ForgotPassword(passwordResetEmail:string) {

    const actionCodeSettings = {
      url: 'https://localhost:4200/reset-password',
    }
    // Send Email to ResetEmails
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail,actionCodeSettings)
    .then(() => {

      window.alert('Password reset email sent, check your inbox.');

    }).catch((error) => {

      window.alert(error)

    })
  }


  // Check If the user LoggedIn To Site
  get isLoggedIn(): boolean {

    const user = JSON.parse(localStorage.getItem('user')|| '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  // Login throw Google account
  GoogleAuth() {
    //The GoogleAuthProvider provide the login page for user
    return this.AuthLogin(new GoogleAuthProvider());

  }

  // Login By the outher account such like Google Or Facebook Or Twitter
  AuthLogin(provider:AuthProvider) {

    return this.afAuth.signInWithPopup(provider)
    .then((result) => {

      this.ngZone.run(() => {
          this.router.navigate(['/']);
        })

        this.SetUserData(result.user);
    }).catch((error) => {

      window.alert(error)

    })
  }

  SetUserData(user:any) {

    // Save the user information to the database
    const userData: User = {

      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified

    }

    console.log(userData);

    this.http.post(this.API_LINK + "/signup", userData).subscribe(
      (res) => {
        console.log(res);
      }

    );

  }

  // Signout Clear the token from the local storage
  SignOut() {

    return this.afAuth.signOut().then(() => {
      this.authStatusListener.next(false);
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })

  }


  handleVerifyEmail(actionCode:string):boolean {
    // Handle the email verification process
    // need to be hosted
    let status = false;

    this.afAuth.applyActionCode(actionCode).then((resp) => {
      console.log(actionCode);

      status = true;

    }).catch((error) => {

      status = false;
    });
    console.log(status);

    return status;
  }

  //this function to get the user Profile
  getUserProfile(){
    const auth = getAuth();
    const user = auth.currentUser;
    if(user){
      this.currentUser= user;
      this.authStatusListener.next(this.currentUser);
    }else{
      console.log("No user found");
    }
  }
}

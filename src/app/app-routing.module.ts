import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { ReadPostComponent } from './posts/read-post/read-post.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SignupComponent } from './user/signup/signup.component';
import { VerifiedEmailComponent } from './user/verified-email/verified-email.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';

//protect the routes

const routes: Routes = [
  { path: '',                   component: HomeComponent },
  { path: 'login',              component: LoginComponent },
  { path: 'signup',             component: SignupComponent },
  { path: 'forgot-password',    component: ForgotPasswordComponent},
  { path: 'email-verification', component: VerifyEmailComponent},
  { path: 'email-verified',     component: VerifiedEmailComponent},
  { path: 'profile/:id',        component: ProfileComponent},
  { path: 'post/:id',           component: ReadPostComponent },
  { path: 'create',             component: CreatePostComponent ,canActivate : [AuthGuardService]},
  { path: 'post/edit/:id',      component: UpdatePostComponent,canActivate : [AuthGuardService]},
  { path: 'posts',              component: ListPostComponent},
  { path: '**',                 component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

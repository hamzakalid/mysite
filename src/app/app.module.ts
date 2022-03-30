import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LyHammerGestureConfig, LyThemeModule, LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2 } from '@alyle/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { DatabaseModule } from "@angular/fire/database";
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyIconModule } from '@alyle/ui/icon';
import { LyButtonModule } from '@alyle/ui/button';
import { LyTypographyModule } from '@alyle/ui/typography';
import { LyBadgeModule } from '@alyle/ui/badge';
import { LyGridModule } from '@alyle/ui/grid';
import { LyMenuModule } from '@alyle/ui/menu';
import { LyAvatarModule } from '@alyle/ui/avatar';;
import { LyDividerModule } from '@alyle/ui/divider';
import { LyFieldModule } from '@alyle/ui/field';
import { LyCardModule } from '@alyle/ui/card';
import { LySkeletonModule } from '@alyle/ui/skeleton';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { ReadPostComponent } from './posts/read-post/read-post.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { VerifiedEmailComponent } from './user/verified-email/verified-email.component';
import { HomeComponent } from './home/home.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { LyDialogModule } from '@alyle/ui/dialog';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { CropperDialog } from './components/cropper-dialog/cropper-dialog.component';
import { ChatComponent } from './components/chat/chat/chat.component';

import * as firebase from 'firebase/app';
import { DatePipe } from '@angular/common';
import { HotToastModule } from '@ngneat/hot-toast';
import { NotifyComponent } from './components/notify/notify.component';
import { AuthGuardService } from './service/auth-guard.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';

firebase.initializeApp(environment.firebaseConfig);
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    CreatePostComponent,
    UpdatePostComponent,
    ListPostComponent,
    ReadPostComponent,
    ProfileComponent,
    NotFoundPageComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    VerifiedEmailComponent,
    HomeComponent,
    CropperDialog,
    ChatComponent,
    NotifyComponent,
    DialogComponent,
    ProfileDialogComponent,
  ],
  imports: [

    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    DatabaseModule,
    LyButtonModule,
    LyToolbarModule,
    LyIconModule,
    LyBadgeModule,
    LyTypographyModule,
    LyGridModule,
    LyMenuModule,
    LyAvatarModule,
    LyDividerModule,
    LyFieldModule,
    LyCardModule,
    LySkeletonModule,
    LyDialogModule,
    LyImageCropperModule,
    LySliderModule,

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HotToastModule.forRoot(),


    //translating
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en',
  })


  ],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    StyleRenderer, LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    DatePipe,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

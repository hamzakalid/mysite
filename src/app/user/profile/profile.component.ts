import { LyTheme2 } from '@alyle/ui';
import { LyDialog, } from '@alyle/ui/dialog';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PostsService } from 'src/app/posts/posts.service';
import { AuthService } from '../auth.service';
import { title } from 'process';
const styles = ({
  icon: {
    marginAfter: '.5em'
  },
  iconLarge: {
    fontSize: '48px'
  },
  iconExtraLarge: {
    fontSize: '72px'
  }
});

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  readonly classes = this._theme.addStyleSheet(styles);
  updateUserForm:FormGroup = new FormGroup({
    displayName: new FormControl(),
    phoneNumber: new FormControl(),
    bio: new FormControl(),
  });

  imageLoading = false;
  photo:string="";
  posts:any;
  constructor( public authService:AuthService,
            private _theme:LyTheme2,
            private _dialog: LyDialog,
            private postsService:PostsService,
            private title: Title) {
      this.title.setTitle(this.authService.userState.displayName);


  }

  ngOnInit(): void {

  }

  submit(){
    // update user profile
    const user = this.authService.updateUserProfile(this.updateUserForm.value);
  }


  open() {
    const dialogRef = this._dialog.open<DialogComponent>(DialogComponent, {
      width: 320
    });
    dialogRef.afterClosed.subscribe((result) => console.log(result));
  }

}

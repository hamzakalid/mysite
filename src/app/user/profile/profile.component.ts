import { LyTheme2 } from '@alyle/ui';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/posts/posts.service';
import { AuthService } from '../auth.service';
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
  currentUser: Subscription = new Subscription();

  user:any;
  posts:any;
  constructor(private authService:AuthService,
            private _theme:LyTheme2,
            private postsService:PostsService) {

  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('user')||'{}');
    // console.log(currentUser);

    if(currentUser){

      this.user = {
        name:currentUser.displayName || '',
        email: currentUser.email || '',
        photoUrl: currentUser.photoURL || 'https://api.lorem.space/image/face?w=150&h=150',
        emailVerified: currentUser.emailVerified || '',
        phoneNumber: currentUser.phoneNumber || '',
      }
    }
    console.log(this.user);

    this.posts = this.postsService.getUserPosts();

  }

}

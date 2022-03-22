import { Component, OnInit } from '@angular/core';

import { LyTheme2 } from '@alyle/ui';
import { AuthService } from 'src/app/user/auth.service';
import { Subscription } from 'rxjs';

const styles = ({
  grow: {
    flexGrow: 1
  },
  textCenter:{
    textAlign: 'center',
  },
  nav:{
    backgroundColor: '#fff',
    color: '#000',
    boxShadow:'0px 0px 5px #d5d5d5',
    top:0,
  }
});

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthentacted = false;

  classes = this._theme.addStyleSheet(styles);
  authListenerSub: Subscription=new Subscription();

  constructor(private _theme: LyTheme2,public authService:AuthService) { }

  ngOnInit(): void {

    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(userisAutheticated =>{
      this.isAuthentacted = userisAutheticated;

    });
  }

}

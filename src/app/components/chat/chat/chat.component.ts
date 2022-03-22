import { LyTheme2 } from '@alyle/ui';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from '../chat.service';
import { HotToastService } from '@ngneat/hot-toast';

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
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  readonly classes = this._theme.addStyleSheet(styles);
  items?: Observable<any[]>;
  message = new FormControl();
  public winStatus = false;
  Msg = {
    message: '',
    title: '',
    icon: ''
  }

  constructor(private chatService:ChatService,private _theme: LyTheme2,private toastService: HotToastService) {
    this.items = this.chatService.getMessages();

    this.items.subscribe(data => {
      this.scroll();
      // bootsrap notification
      this.notify(data[data.length-1].message,data[data.length-1].user);


    });
  }

  ngOnInit(): void {

  }

  sendMessage() {
    this.chatService.newMessage(this.message.value);
    this.message.setValue('');
    this.scroll();
  }

  // this function to list the messages
  isOwner():any{

    const User = JSON.parse(localStorage.getItem('user')||'{}')
    return User;

  }

  scroll(){

    //scroll to bottom of div
    var element = document.getElementsByClassName("chat-window")[0] as HTMLElement;
    element.scrollTop = element.scrollHeight;

  }

  notify(message:string,user:any){





    if(user.id != this.isOwner().uid){

      // this.toastService.show(`${user.name} : ${message}`, {
      //   autoClose: true,
      //   dismissible: true,
      //   duration: 5000,
      //   icon: '💬',
      // });
      Notification.requestPermission().then(function(result) {
        if(result=="granted"){
          // navigator.serviceWorker.getRegistration().then((reg:any)=>{
          //   let op ={
          //     body: message,
          //     icon:user.photoUrl,
          //     vibrate: [100, 50, 100],
          //     data: {
          //       dateOfArrival: Date.now(),
          //       primaryKey: 1
          //     }
          //   }
          //   reg.showNotification(user.name, op);
          // })
          var img = user.photoUrl;
          var text = message;
          var notification = new Notification(user.name, { body: text, icon: img });
          notification.addEventListener('click', () => window.open(location.href));
        }

      });


    }




  }

  // this function user to check if the user online
  isOnline(){

 return true

  }


}

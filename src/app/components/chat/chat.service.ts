import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { log, profile } from 'console';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) {
  }
  // this function to create real time message
  newMessage(message:string) {
    const User = JSON.parse(localStorage.getItem('user')||'{}');
      console.log(User);
      // this.createChat(User.uid,id);
    this.db.list('/Chat').push({
      message: message,
      user: {
        id: User.uid,
        name: User.displayName || "Anonymous",
        email: User.email,
        photoUrl: User.photoURL || "https://api.lorem.space/image/face?w=150&h=150"
      },
      date:"" + new Date()
    });

  }

  //this function to list the messages
  getMessages() {

    return this.db.list('/Chat').valueChanges();
  }

  //this function use to create group
  createGrop(id:string,name:string){
    this.db.list('/Groups').push({
      id:id,
      name:name
    });
  }

  //this function use to add members to group
  addMember(id:string,user:any){
    this.db.list('/Groups/'+id+'/members').push({
      id:user.uid,
      name:user.displayName || "Anonymous",
      email:user.email,
      photoUrl:user.photoURL || "https://api.lorem.space/image/face?w=150&h=150"
    });
  }


}

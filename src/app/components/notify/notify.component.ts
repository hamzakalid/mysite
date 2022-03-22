import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  data ={
    title: 'Notification',
    message: 'You have a new message',
    icon: 'notifications',
  }
  constructor() { }

  ngOnInit(): void {
  }

}

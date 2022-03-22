import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  online: boolean;
  isNetworkStopped = false;


  constructor( private toast: HotToastService) {
    this.online = window.navigator.onLine;

    fromEvent(window, 'online').subscribe(e => {
      this.online = true;
      this.toast.success('You are online');
    });

    fromEvent(window, 'offline').subscribe(e => {
      this.online = false;
      this.toast.error('You are offline',);
    });

  }


}

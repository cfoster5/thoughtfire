import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  userInfo;

  constructor() {
    // this.userInfo = {};
    // this.userInfo.firstName = localStorage.getItem('firstName')
    // this.userInfo.lastName = localStorage.getItem('lastName')
    // this.userInfo.email = localStorage.getItem('email')
  }
}

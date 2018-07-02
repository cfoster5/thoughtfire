import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;

  constructor(private router: Router, private route: ActivatedRoute, public userSvc: UserinfoService) {
    let firstName: string = localStorage.getItem('firstName');
    let lastName: string = localStorage.getItem('lastName');
    let email: string = localStorage.getItem('email');
    let col1: string = localStorage.getItem('col1');
    let col2: string = localStorage.getItem('col2')
    let col3: string = localStorage.getItem('col3')
    let col4: string = localStorage.getItem('col4')

    if (firstName && lastName && email) {
        if (col1 && col2 && col3 && col4) {
          this.userSvc.userInfo = {firstName: firstName, lastName: lastName, email: email, col1: col1, col2: col2, col3: col3, col4: col4}
          this.router.navigate(['/profile'], { relativeTo: this.route })
        }
        else {
          this.userSvc.userInfo = {firstName: firstName, lastName: lastName, email: email}
          this.router.navigate(['/about'], { relativeTo: this.route })
        }
    }
    // console.log(localStorage.getItem('firstName'), localStorage.getItem('lastName'), localStorage.getItem('email'))
  }

  ngOnInit() {
  }

  continue() {
    let regexName = /^[a-z ,.'-]+$/i
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (regexName.test(this.firstName) && regexName.test(this.lastName) && regexEmail.test(this.email)) {
      this.router.navigate(['/about'], { relativeTo: this.route })
      this.userSvc.userInfo = {firstName: this.firstName, lastName: this.lastName, email: this.email}

      localStorage.setItem('firstName', this.userSvc.userInfo.firstName);
      localStorage.setItem('lastName', this.userSvc.userInfo.lastName);
      localStorage.setItem('email', this.userSvc.userInfo.email);

      console.log("userInfo", this.userSvc.userInfo)
    }
    else {
      alert("There was an error with your information.")
    }

  }

}

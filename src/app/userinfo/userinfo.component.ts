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

  constructor(private router: Router, private route: ActivatedRoute, public userSvc: UserinfoService) { }

  ngOnInit() {
  }

  continue() {
    let regexName = /^[a-z ,.'-]+$/i
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (regexName.test(this.firstName) && regexName.test(this.lastName) && regexEmail.test(this.email)) {
      this.router.navigate(['/survey'], { relativeTo: this.route })
      this.userSvc.userInfo = {firstName: this.firstName, lastName: this.lastName, email: this.email}
      console.log("userInfo", this.userSvc.userInfo)
    }
    else {
      alert("There was an error with your information.")
    }

  }

}

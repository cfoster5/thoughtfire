import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { NgProgress } from 'ngx-progressbar';
import { Questions } from '../questions'

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  dropdown: string = `
    <select>
      <option [ngValue]="1">1</option>
      <option [ngValue]="2">2</option>
      <option [ngValue]="3">3</option>
      <option [ngValue]="4">4</option>
    </select>
    `
  col1: number = 0;
  col2: number = 0;
  col3: number = 0;
  col4: number = 0;

  counter: number = 0;

  valueCount: number;

  constructor(public userSvc: UserinfoService, private router: Router, private route: ActivatedRoute, public ngProgress: NgProgress, public questions: Questions) {
    console.log("userInfo", this.userSvc.userInfo)
    console.log(localStorage.getItem('firstName'), localStorage.getItem('lastName'), localStorage.getItem('email'))
    if (!this.userSvc.userInfo) {
        this.router.navigate(['../'], { relativeTo: this.route })
    }
    // this.ngProgress.set(0);
    console.log(this.questions.questions.length)
  }

  ngOnInit() {
  }

  change(event) {
    var selects = event.getElementsByTagName('select')
    console.log(selects)

    this.valueCount = 0
    for (let i = 0; i < selects.length; i++) {
      this.valueCount += parseInt(selects[i].value);
      if (this.counter != 0 && this.counter != Number(1) && this.counter != Number(4) && this.counter != Number(9) && this.counter != Number(13) && this.counter != Number(16)) {
        console.log("will count")
        if (i == 0) {
          this.col1 += parseInt(selects[i].value);
        }
        if (i == 1) {
          this.col2 += parseInt(selects[i].value);
        }
        if (i == 2) {
          this.col3 += parseInt(selects[i].value);
        }
        if (i == 3) {
          this.col4 += parseInt(selects[i].value);
        }
      }
    }
    console.log("valueCount", this.valueCount)

    console.log("col1 sum", this.col1)
    console.log("col2 sum", this.col2)
    console.log("col3 sum", this.col3)
    console.log("col4 sum", this.col4)
  }

  continuePressed() {
    let data = {
      firstName: this.userSvc.userInfo.firstName,
      lastName: this.userSvc.userInfo.lastName,
      email: this.userSvc.userInfo.email,
      col1: this.col1,
      col2: this.col2,
      col3: this.col3,
      col4: this.col4
    }

    if (this.valueCount == 10) {
      this.counter += 1;
      console.log(this.counter)
      this.ngProgress.set(this.counter/this.questions.questions.length);
      this.valueCount = 0

      if (this.counter == this.questions.questions.length) {
        firebase.database().ref('surveys/').push(data);

        this.userSvc.userInfo.col1 = this.col1;
        this.userSvc.userInfo.col2 = this.col2;
        this.userSvc.userInfo.col3 = this.col3;
        this.userSvc.userInfo.col4 = this.col4;

        localStorage.setItem('col1', this.userSvc.userInfo.col1);
        localStorage.setItem('col2', this.userSvc.userInfo.col2);
        localStorage.setItem('col3', this.userSvc.userInfo.col3);
        localStorage.setItem('col4', this.userSvc.userInfo.col4);

        this.router.navigate(['/profile'], { relativeTo: this.route })
      }
    }
  }

  goBack() {
    if (this.counter) {
      this.counter -= 1;
      console.log(this.counter)
      this.ngProgress.set(this.counter/this.questions.questions.length);
      this.valueCount = 0
    }
    else {
      this.router.navigate(['/about'], { relativeTo: this.route })
    }
  }

}

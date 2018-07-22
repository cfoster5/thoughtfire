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

  selections = [];

  constructor(public userSvc: UserinfoService, private router: Router, private route: ActivatedRoute, public ngProgress: NgProgress, public questions: Questions) {
    console.log("userInfo", this.userSvc.userInfo)
    console.log(localStorage.getItem('firstName'), localStorage.getItem('lastName'), localStorage.getItem('email'))
    if (!this.userSvc.userInfo && !localStorage.getItem('firstName')) {
    // if (!localStorage.getItem('firstName')) {
        this.router.navigate(['../'], { relativeTo: this.route })
    }
    // this.ngProgress.set(0);
    console.log(this.questions.questions.length)
  }

  ngOnInit() {
  }

  continuePressed() {
    let data = {
      // firstName: this.userSvc.userInfo.firstName,
      // lastName: this.userSvc.userInfo.lastName,
      // email: this.userSvc.userInfo.email,
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      col1: this.col1,
      col2: this.col2,
      col3: this.col3,
      col4: this.col4
    }

    if (this.selections.length == 4) {

      this.selections = [];

      console.log(this.col1, this.col2, this.col3, this.col4)

      this.counter += 1;
      console.log(this.counter)
      this.ngProgress.set(this.counter/this.questions.questions.length);

      if (this.counter != 0 && this.counter != Number(1) && this.counter != Number(4) && this.counter != Number(9) && this.counter != Number(13) && this.counter != Number(16)) {

        let spans = document.getElementsByTagName('span')

        this.col1 += parseInt(spans[0].innerText);
        this.col2 += parseInt(spans[1].innerText);
        this.col3 += parseInt(spans[2].innerText);
        this.col4 += parseInt(spans[3].innerText);

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
  }

  goBack() {
    if (this.counter) {
      this.counter -= 1;
      console.log(this.counter)
      this.ngProgress.set(this.counter/this.questions.questions.length);
    }
    else {
      this.router.navigate(['/about'], { relativeTo: this.route })
    }
  }

  makeSelection(event) {
    if (!this.selections.includes(event.target.value)) {
        console.log(event)
        console.log(event.target.value)
        this.selections.push(event.target.value)
        console.log(this.selections)
        console.log(this.selections.includes(event.target.value))

        console.log("col1 sum", this.col1)
        console.log("col2 sum", this.col2)
        console.log("col3 sum", this.col3)
        console.log("col4 sum", this.col4)
    }
  }

  resetSelections(){
    let dialogue = confirm("Would you like to reset your selections for this group?");
    if (dialogue == true) {
        this.selections = [];
        console.log("You pressed OK!");
    } else {
        console.log("You pressed Cancel!");
    }
  }

}

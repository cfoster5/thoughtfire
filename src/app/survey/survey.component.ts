import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  dropdown: string = `
      <option [ngValue]="1">1</option>
      <option [ngValue]="2">2</option>
      <option [ngValue]="3">3</option>
      <option [ngValue]="4">4</option>
    `
  col1: number;
  col2: number;
  col3: number;
  col4: number;

  rowResults = [];

  constructor(public userSvc: UserinfoService, private router: Router, private route: ActivatedRoute) {
    console.log("userInfo", this.userSvc.userInfo)
    if (!this.userSvc.userInfo) {
        this.router.navigate(['../'], { relativeTo: this.route })
    }
  }

  ngOnInit() {
  }

  change(event) {
    var selects = event.getElementsByTagName('select')

    this.col1 = 0;
    this.col2 = 0;
    this.col3 = 0;
    this.col4 = 0;

    // REVIEW: LOOP THROUGH ALL SELECT VALUES ITERATING BY 4; GET SUM OF COLUMN'S SELECT VALUES EXCLUDING SPECIFIED INDEXES
    for (var i = 0; i < selects.length; i += 4) {
        if (i != 0 && i != 4 && i != 16 && i != 36 && i != 52 && i != 64) {
          this.col1 += parseInt(selects[i].value);
        }
    }

    for (var i = 1; i < selects.length; i += 4) {
      if (i != 1 && i != 5 && i != 17 && i != 37 && i != 53 && i != 65) {
        this.col2 += parseInt(selects[i].value);
      }
    }

    for (var i = 2; i < selects.length; i += 4) {
      if (i != 2 && i != 6 && i != 18 && i != 38 && i != 54 && i != 66) {
        this.col3 += parseInt(selects[i].value);
      }
    }
    for (var i = 3; i < selects.length; i += 4) {
      if (i != 3 && i != 7 && i != 19 && i != 39 && i != 55 && i != 67) {
        this.col4 += parseInt(selects[i].value);
      }
    }

    console.log("col1 sum", this.col1)
    console.log("col2 sum", this.col2)
    console.log("col3 sum", this.col3)
    console.log("col4 sum", this.col4)
  }

  continuePressed() {
    let values = []

    var selects = document.getElementsByTagName('select')
    // console.log(selects)

    for (let i = 0; i < selects.length; i++) {
      // console.log(selects[i].value)
      values.push(selects[i].value)
    }

    // console.log(values)

    // REVIEW: LOOP THROUGH ALL SELECT VALUES; PUSH SUM OF EVERY 4 ITEMS TO ARRAY
    this.rowResults = [];
    var counter = 0;
    var sum = 0;
    for(var i = 0; i < values.length; i++){
      // console.log(values[i])
      counter++;
      sum += parseInt(values[i]);
      // console.log(sum)
      if(counter === 4 || i === values.length-1){
        this.rowResults.push(sum);
        counter = 0;
        sum = 0;
      }
    }

    console.log("rowSums", this.rowResults)

    let data = {
      firstName: this.userSvc.userInfo.firstName,
      lastName: this.userSvc.userInfo.lastName,
      email: this.userSvc.userInfo.email,
      col1: this.col1,
      col2: this.col2,
      col3: this.col3,
      col4: this.col4
    }

    console.log(data)

    let validated: boolean = true;

    for (let i = 0; i < this.rowResults.length; i++) {
        if (this.rowResults[i] != 10) {
          validated = false
        }
    }

    if (validated) {
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
    else {
      alert("There was an error with your inventory.")
    }

  }

}

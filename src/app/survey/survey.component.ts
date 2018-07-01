import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  change(event) {
    var selects = event.getElementsByTagName('select')

    this.col1 = 0;
    this.col2 = 0;
    this.col3 = 0;
    this.col4 = 0;

    for (var i = 0; i < selects.length; i += 4) {
        this.col1 += parseInt(selects[i].value);
    }
    for (var i = 1; i < selects.length; i += 4) {
        this.col2 += parseInt(selects[i].value);
    }
    for (var i = 2; i < selects.length; i += 4) {
        this.col3 += parseInt(selects[i].value);
    }
    for (var i = 3; i < selects.length; i += 4) {
        this.col4 += parseInt(selects[i].value);
    }

    console.log("col1 sum", this.col1)
    console.log("col2 sum", this.col2)
    console.log("col3 sum", this.col3)
    console.log("col4 sum", this.col4)
  }

}

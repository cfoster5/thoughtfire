import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutsurvey',
  templateUrl: './aboutsurvey.component.html',
  styleUrls: ['./aboutsurvey.component.css']
})
export class AboutSurveyComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    let firstName: string = localStorage.getItem('firstName');
    let lastName: string = localStorage.getItem('lastName');
    let email: string = localStorage.getItem('email');
    let col1: string = localStorage.getItem('col1');
    let col2: string = localStorage.getItem('col2')
    let col3: string = localStorage.getItem('col3')
    let col4: string = localStorage.getItem('col4')

    if (!firstName && !lastName && !email) {
        this.router.navigate(['/user'], { relativeTo: this.route })
    }
  }

  ngOnInit() {
  }

}

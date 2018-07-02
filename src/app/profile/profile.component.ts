import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public userSvc: UserinfoService, private router: Router, private route: ActivatedRoute) {
    console.log(this.userSvc.userInfo)

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
          this.router.navigate(['/survey'], { relativeTo: this.route })
        }
    }
    else {
      this.router.navigate(['/user'], { relativeTo: this.route })
    }
  }

  ngOnInit() {
  }

  // Radar
  public radarChartLabels:string[] = ['Experiencing', 'Ideation', 'Thinking', 'Evaluation'];

  public radarChartData:any = [
    // {data: [this.userSvc.userInfo.col1, this.userSvc.userInfo.col2, this.userSvc.userInfo.col3, this.userSvc.userInfo.col4]},
    // REVIEW: Retrieving from localStorage fixed blank page bug happening every other refresh
    {data: [localStorage.getItem('col1'), localStorage.getItem('col2'), localStorage.getItem('col3'), localStorage.getItem('col4')]},
    // {data: [28, 48, 40, 19]}
  ];
  public radarChartType:string = 'radar';

  public radarChartOptions: any = {
    responsive: true
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}

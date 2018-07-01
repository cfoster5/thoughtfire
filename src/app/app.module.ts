import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SafeHTMLPipe } from './safe-html.pipe';
import { UserinfoComponent } from './userinfo/userinfo.component';

const appRoutes: Routes = [
  { path: 'survey', component: SurveyComponent },
  { path: 'user',
    component: UserinfoComponent,
    pathMatch: 'full'
  },
  { path: '',
    component: UserinfoComponent,
    pathMatch: 'full'
  },
  { path: '**',
    component: UserinfoComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SafeHTMLPipe,
    UserinfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

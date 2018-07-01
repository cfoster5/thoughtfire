import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SafeHTMLPipe } from './safe-html.pipe';

const appRoutes: Routes = [
  { path: 'survey', component: SurveyComponent },
  { path: '',
    component: SurveyComponent,
    pathMatch: 'full'
  },
  // { path: '**',
  //   component: HomeComponent,
  //   pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SafeHTMLPipe
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SafeHTMLPipe } from './safe-html.pipe';
import { UserinfoComponent } from './userinfo/userinfo.component';

export const firebaseConfig = {
  apiKey: "AIzaSyA9Guncsjq16oLQexy7dgWA-PAxRu62rPE",
  authDomain: "thoughtfire-2e4db.firebaseapp.com",
  databaseURL: "https://thoughtfire-2e4db.firebaseio.com",
  projectId: "thoughtfire-2e4db",
  storageBucket: "thoughtfire-2e4db.appspot.com",
  messagingSenderId: "609986085276"
};

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

firebase.initializeApp(firebaseConfig)

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
      appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

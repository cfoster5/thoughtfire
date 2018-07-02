import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSurveyComponent } from './aboutsurvey.component';

describe('AboutSurveyComponent', () => {
  let component: AboutSurveyComponent;
  let fixture: ComponentFixture<AboutSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

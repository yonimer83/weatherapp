import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSearchedComponent } from './last-searched.component';

describe('LastSearchedComponent', () => {
  let component: LastSearchedComponent;
  let fixture: ComponentFixture<LastSearchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastSearchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

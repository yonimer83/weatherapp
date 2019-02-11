import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempunitComponent } from './tempunit.component';

describe('TempunitComponent', () => {
  let component: TempunitComponent;
  let fixture: ComponentFixture<TempunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

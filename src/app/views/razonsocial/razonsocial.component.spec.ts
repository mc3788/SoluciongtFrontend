import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazonsocialComponent } from './razonsocial.component';

describe('RazonsocialComponent', () => {
  let component: RazonsocialComponent;
  let fixture: ComponentFixture<RazonsocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazonsocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazonsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

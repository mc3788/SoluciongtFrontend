import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CotizadorautomaticoComponent } from './cotizadorautomatico.component';

describe('CotizadorautomaticoComponent', () => {
  let component: CotizadorautomaticoComponent;
  let fixture: ComponentFixture<CotizadorautomaticoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizadorautomaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorautomaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

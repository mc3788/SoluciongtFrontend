import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorautomaticoComponent } from './cotizadorautomatico.component';

describe('CotizadorautomaticoComponent', () => {
  let component: CotizadorautomaticoComponent;
  let fixture: ComponentFixture<CotizadorautomaticoComponent>;

  beforeEach(async(() => {
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

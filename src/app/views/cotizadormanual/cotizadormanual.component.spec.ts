import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadormanualComponent } from './cotizadormanual.component';

describe('CotizadormanualComponent', () => {
  let component: CotizadormanualComponent;
  let fixture: ComponentFixture<CotizadormanualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizadormanualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadormanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CotizadormanualComponent } from './cotizadormanual.component';

describe('CotizadormanualComponent', () => {
  let component: CotizadormanualComponent;
  let fixture: ComponentFixture<CotizadormanualComponent>;

  beforeEach(waitForAsync(() => {
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

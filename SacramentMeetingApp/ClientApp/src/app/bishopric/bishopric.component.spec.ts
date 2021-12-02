import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BishopricComponent } from './bishopric.component';

describe('BishopricComponent', () => {
  let component: BishopricComponent;
  let fixture: ComponentFixture<BishopricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BishopricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BishopricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

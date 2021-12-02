import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BishopricEditComponent } from './bishopric-edit.component';

describe('BishopricEditComponent', () => {
  let component: BishopricEditComponent;
  let fixture: ComponentFixture<BishopricEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BishopricEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BishopricEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

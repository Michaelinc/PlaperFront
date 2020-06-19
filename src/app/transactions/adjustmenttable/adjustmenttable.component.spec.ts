import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmenttableComponent } from './adjustmenttable.component';

describe('AdjustmenttableComponent', () => {
  let component: AdjustmenttableComponent;
  let fixture: ComponentFixture<AdjustmenttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmenttableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmenttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

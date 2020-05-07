import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingaccountComponent } from './savingaccount.component';

describe('SavingaccountComponent', () => {
  let component: SavingaccountComponent;
  let fixture: ComponentFixture<SavingaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

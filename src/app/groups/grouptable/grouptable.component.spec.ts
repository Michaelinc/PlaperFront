import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouptableComponent } from './grouptable.component';

describe('GrouptableComponent', () => {
  let component: GrouptableComponent;
  let fixture: ComponentFixture<GrouptableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouptableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

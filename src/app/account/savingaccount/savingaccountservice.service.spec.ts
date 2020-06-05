import { TestBed } from '@angular/core/testing';

import { SavingaccountserviceService } from '../../Sevices/savingaccountservice.service';

describe('SavingaccountserviceService', () => {
  let service: SavingaccountserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingaccountserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Kw3outService } from './kw3out.service';

describe('Kw3outService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Kw3outService]
    });
  });

  it('should ...', inject([Kw3outService], (service: Kw3outService) => {
    expect(service).toBeTruthy();
  }));
});

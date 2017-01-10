/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoApiService } from './todo-api.service';

describe('TodoApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoApiService]
    });
  });

  it('should ...', inject([TodoApiService], (service: TodoApiService) => {
    expect(service).toBeTruthy();
  }));
});

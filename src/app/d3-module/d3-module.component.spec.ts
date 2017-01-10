/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { D3ModuleComponent } from './d3-module.component';

describe('D3ModuleComponent', () => {
  let component: D3ModuleComponent;
  let fixture: ComponentFixture<D3ModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3ModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

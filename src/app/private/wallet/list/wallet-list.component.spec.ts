/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WalletListComponent } from './wallet-list.component';

describe('WalletListComponent', () => {
  let component: WalletListComponent;
  let fixture: ComponentFixture<WalletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

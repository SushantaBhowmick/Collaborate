import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteList } from './invite-list';

describe('InviteList', () => {
  let component: InviteList;
  let fixture: ComponentFixture<InviteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteList],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

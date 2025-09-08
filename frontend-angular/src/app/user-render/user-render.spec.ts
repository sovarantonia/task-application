import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRender } from './user-render';

describe('UserRender', () => {
  let component: UserRender;
  let fixture: ComponentFixture<UserRender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

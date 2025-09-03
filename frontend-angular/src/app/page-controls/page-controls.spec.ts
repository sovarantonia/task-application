import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageControls } from './page-controls';

describe('PageControls', () => {
  let component: PageControls;
  let fixture: ComponentFixture<PageControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPagination } from './items-pagination';

describe('ItemsPagination', () => {
  let component: ItemsPagination;
  let fixture: ComponentFixture<ItemsPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

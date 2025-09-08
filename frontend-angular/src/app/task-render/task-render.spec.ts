import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRender } from './task-render';

describe('TaskRender', () => {
  let component: TaskRender;
  let fixture: ComponentFixture<TaskRender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskRender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskRender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

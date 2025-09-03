import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task-service';
import { Task } from '../entity/task';
import { MobxAngularModule } from 'mobx-angular';

@Component({
  selector: 'task-pagination',
  imports: [MobxAngularModule],
  templateUrl: './task-pagination.html',
  styleUrls: ['./task-pagination.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPagination implements OnInit {
  constructor(public taskService: TaskService) { }

    ngOnInit() {
      this.taskService.getPaginatedTasks();
    }
}


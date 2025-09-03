import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task/task-service';
import { MobxAngularModule } from 'mobx-angular';

@Component({
  selector: 'task-pagination',
  imports: [MobxAngularModule],
  templateUrl: './task-pagination.html',
  styleUrls: ['./task-pagination.css'],
})
export class TaskPagination implements OnInit {
  constructor(public taskService: TaskService) { }

    ngOnInit() {
      this.taskService.getPaginatedTasks();
    }
}


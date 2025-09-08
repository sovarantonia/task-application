import { Component, Input } from '@angular/core';
import { observable } from 'mobx';
import { Task } from '../entity/task';
import { MobxAngularModule } from "mobx-angular";

@Component({
  selector: 'task-render',
  imports: [MobxAngularModule],
  templateUrl: './task-render.html',
  styleUrl: './task-render.css'
})
export class TaskRender {
  @Input() @observable public paginatedTasks!: Task[];
  @Input() public userMap = new Map<string, string>(); 
  @Input() public statusMap = new Map<number, string>();
}

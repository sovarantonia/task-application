import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskPagination } from './task-pagination/task-pagination';
import { TaskService } from './service/task-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskPagination],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-app');
}

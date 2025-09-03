import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskPagination } from './task-pagination/task-pagination';
import { TaskService } from './service/task/task-service';
import { UserPagination } from "./user-pagination/user-pagination";
import { PageControls } from "./page-controls/page-controls";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskPagination, UserPagination, PageControls],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-app');
}

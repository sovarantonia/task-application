import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskPagination } from './task-pagination/task-pagination';
import { UserPagination } from "./user-pagination/user-pagination";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskPagination, UserPagination],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-app');
  
}

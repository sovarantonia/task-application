import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task/task-service';
import { MobxAngularModule } from 'mobx-angular';
import { PagerData } from '../entity/pager-data';
import { PaginationRequest } from '../entity/pagination-request';
import { PageControls } from "../page-controls/page-controls";
import { Task } from '../entity/task';
import { makeAutoObservable, observable } from 'mobx';

@Component({
  selector: 'task-pagination',
  imports: [MobxAngularModule, PageControls],
  templateUrl: './task-pagination.html',
  styleUrls: ['./task-pagination.css'],
})
export class TaskPagination implements OnInit {
  public pagerData: PagerData = { currentPageNo: 1, itemsPerPage: 5 };
  public paginationRequest: PaginationRequest = { pagerData: this.pagerData, sortCriteria: [], filterCriteria: [] };
  
  @observable paginatedTasks: Task[] = [];
  @observable totalPages!: number;
  
  constructor(public taskService: TaskService) { makeAutoObservable(this);}

  ngOnInit() {
    this.getPaginatedTasks();
  }

  async getPaginatedTasks() {
    const res = await this.taskService.getPaginatedTasks(this.paginationRequest);
    this.paginatedTasks = res.paginatedItems;
    this.totalPages = res.totalPages;
  }

  onPagerDataChanged(pagerData: PagerData) {
    this.pagerData = pagerData;
    this.paginationRequest.pagerData = pagerData;
    this.getPaginatedTasks();
  }
}


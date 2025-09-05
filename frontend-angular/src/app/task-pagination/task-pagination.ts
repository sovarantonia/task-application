import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task/task-service';
import { MobxAngularModule } from 'mobx-angular';
import { PagerData } from '../entity/pager-data';
import { PaginationRequest } from '../entity/pagination-request';
import { PageControls } from "../page-controls/page-controls";
import { Task } from '../entity/task';
import { makeAutoObservable, observable } from 'mobx';
import { SortControls } from "../sort-controls/sort-controls";
import { RawPaginationDetails } from '../entity/raw-pagination-details';
import { SelectOptionList } from '../entity/select-option-list';
import { UserService } from '../service/user/user-service';
import { StatusService } from '../service/status/status-service';
import { SelectOptionValueText } from '../entity/select-option-value-text';
import { FilterControls } from "../filter-controls/filter-controls";

@Component({
  selector: 'task-pagination',
  imports: [MobxAngularModule, PageControls, SortControls, FilterControls],
  templateUrl: './task-pagination.html',
  styleUrls: ['./task-pagination.css'],
})
export class TaskPagination implements OnInit {
  public pagerData: PagerData = { currentPageNo: 1, itemsPerPage: 5 };
  public sortCriteria!: Map<string, number>;
  public paginationDetails : RawPaginationDetails = { pagerData: this.pagerData, sortCriteria: new Map<string, number>(), filterCriteria: new Map<string, string>() };

  public sortColumns = ["title", "creationDate"];
  public selectOptionList!: SelectOptionList[];

  @observable paginatedTasks: Task[] = [];
  totalPages: number = 1;

  constructor(public taskService: TaskService, public userUservice: UserService, public statusService: StatusService, private cdref: ChangeDetectorRef) { makeAutoObservable(this); }

  ngOnInit() {
    // this.getAllUsers();
    this.getPaginatedTasks();
  }

  async getPaginatedTasks() {
    this.cdref.detectChanges();
    const res = await this.taskService.getPaginatedTasks(this.paginationDetails);
    this.paginatedTasks = res.paginatedItems;
    this.totalPages = res.totalPages;
    this.cdref.detectChanges();
  }

  onPagerDataChanged(pagerData: PagerData) {
    this.pagerData = pagerData;
    this.paginationDetails.pagerData = pagerData;
    this.getPaginatedTasks();
  }

  onSortCriteriaChanged(sortCriteria: Map<string, number>) {
    this.paginationDetails.sortCriteria = sortCriteria;
    this.getPaginatedTasks();
  }

  async getAllUsers() {
    
    const res = await this.userUservice.getAllUsers();
    let selectOption: SelectOptionList = {columnName: "user", foreignKey: "userId", options: []};
    selectOption.columnName = "user";
    res.forEach(elem => {
      const option: SelectOptionValueText = { value: elem.id, text: elem.name };
      selectOption.options.push(option);
    });
    this.selectOptionList.push(selectOption);
    console.log(this.selectOptionList);
    
  }

}


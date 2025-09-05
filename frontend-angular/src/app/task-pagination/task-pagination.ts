import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task/task-service';
import { MobxAngularModule } from 'mobx-angular';
import { PagerData } from '../entity/pager-data';
import { PageControls } from "../page-controls/page-controls";
import { Task } from '../entity/task';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { SortControls } from "../sort-controls/sort-controls";
import { RawPaginationDetails } from '../entity/raw-pagination-details';
import { SelectOptionList } from '../entity/select-option-list';
import { UserService } from '../service/user/user-service';
import { StatusService } from '../service/status/status-service';
import { SelectOptionValueText } from '../entity/select-option-value-text';
import { FilterControls } from "../filter-controls/filter-controls";
import { SortColumn } from '../entity/sort-column';

@Component({
  selector: 'task-pagination',
  imports: [MobxAngularModule, PageControls, SortControls, FilterControls],
  templateUrl: './task-pagination.html',
  styleUrls: ['./task-pagination.css'],
})
export class TaskPagination implements OnInit {
  public pagerData: PagerData = { currentPageNo: 1, itemsPerPage: 5 };
  public paginationDetails: RawPaginationDetails = { pagerData: this.pagerData, sortCriteria: new Map<string, number>(), filterCriteria: new Map<string, string>() };

  public sortColumns: SortColumn[] = [{label: "title", foreignKey: "title"}, {label: "date", foreignKey: "creationDate"}];
  @observable public selectOptionList: SelectOptionList[] = [];

  @observable paginatedTasks: Task[] = [];
  @observable totalPages: number = 1;

  public userMap = new Map<string, string>();
  public statusMap = new Map<number, string>();

  constructor(public taskService: TaskService, public userService: UserService, public statusService: StatusService, private cdref: ChangeDetectorRef) {
    makeAutoObservable(this);
  }

  ngOnInit() {
    this.getAllUsers();
    this.getPaginatedTasks();
    this.getAllStatuses();
  }

  async getPaginatedTasks() {
    this.cdref.detectChanges();
    const res = await this.taskService.getPaginatedTasks(this.paginationDetails);
    runInAction(() => {
      this.paginatedTasks = res.paginatedItems;
      this.totalPages = res.totalPages;
    })

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
    const res = await this.userService.getAllUsers();
    runInAction(() => {
      let selectOption: SelectOptionList = { columnName: "user", foreignKey: "userId", options: [] };
      res.forEach(elem => {
        const option: SelectOptionValueText = { value: elem.id, text: elem.name };
        selectOption.options.push(option);
        this.userMap.set(elem.id, elem.name);
      });
      this.selectOptionList.push(selectOption);
    });
  }

  async getAllStatuses() {
    const res = await this.statusService.getAllStatuses();
    runInAction(() => {
      let selectOption: SelectOptionList = { columnName: "status", foreignKey: "statusId", options: [] };
      res.forEach(elem => {
        const option: SelectOptionValueText = { value: elem.id.toString(), text: elem.statusName };
        selectOption.options.push(option);
        this.statusMap.set(elem.id, elem.statusName);
      });
      this.selectOptionList.push(selectOption);
    })
  }

  onFilterCriteriaChanged(filterCriteria: Map<string, string>) {
    this.paginationDetails.filterCriteria = filterCriteria;
    this.getPaginatedTasks();
  }

}


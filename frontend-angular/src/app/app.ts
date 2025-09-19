import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsPagination } from "./items-pagination/items-pagination";
import { TaskService } from './service/task/task-service';
import { UserService } from './service/user/user-service';
import { StatusService } from './service/status/status-service';
import { RawPaginationDetails } from './entity/raw-pagination-details';
import { TaskRender } from "./task-render/task-render";
import { Task } from './entity/task';
import { User } from './entity/user';
import { UserRender } from "./user-render/user-render";
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { SelectOptionList } from './entity/select-option-list';
import { SelectOptionValueText } from './entity/select-option-value-text';
import { SortColumn } from './entity/sort-column';
import { UserForm } from './user-form/user-form';
import { Modal } from "./modal/modal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemsPagination, TaskRender, UserRender, UserForm, Modal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('task-app');
  public taskPaginationFunction: any;
  public userPaginationFunction: any;

  public paginatedTasks: Task[] = [];
  public paginatedUsers: User[] = [];

  public userMap = new Map<string, string>();
  public statusMap = new Map<number, string>();

  @observable public selectOptionList: SelectOptionList[] = [];
  public sortColumns: SortColumn[] = [{ label: "title", foreignKey: "title" }, { label: "date", foreignKey: "creationDate" }];

  public isModalVisible: boolean = false;

  constructor(public taskService: TaskService, public userService: UserService, public statusService: StatusService) {
    this.taskPaginationFunction = (paginationDetails: RawPaginationDetails) => taskService.getPaginatedTasks(paginationDetails);
    this.userPaginationFunction = (paginationDetails: RawPaginationDetails) => userService.getPaginatedUsers(paginationDetails);
    makeAutoObservable(this);
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllStatuses();
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


  async saveUser(user: User) {
    const res = await this.userService.saveUser(user);
    console.log(res);
    this.isModalVisible = false;
  }
}

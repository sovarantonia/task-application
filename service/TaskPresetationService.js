import { initialTaskData } from "../data/initialTaskData.js";
import { TaskService } from "./TaskService.js";
import { PaginationComponent } from "../components/PaginationComponent.js";
import { dateParser } from "../helpers/dateHelper.js";
import { SortTasksControl } from "../components/SortTasksControl.js";
import { FilterTasksControl } from "../components/FilterTasksControl.js";
import { TaskLogic } from "../logic/TaskLogic.js";
import { PagerComponent } from "../components/PagerComponent.js";
import { UserLogic } from "../logic/UserLogic.js";
import { initialUserData } from "../data/initialUserData.js";
import { UserService } from "../service/UserService.js";
import { CheckboxSelectComponent } from "../components/CheckboxSelectComponent.js";
import { PaginationHandler } from "../logic/PaginationHandler.js";
export class TaskPresentationService {
  constructor() {
    initialTaskData.forEach((task) => {
      dateParser(task.creationDate);
    });

    this.taskService = new TaskService(initialTaskData);
    // this.taskPagerComponent = new PagerComponent({selectOptions : [5, 10]});
    // this.taskPaginationHandler = new PaginationHandler();

    this.taskLogic = new TaskLogic({
      taskService: this.taskService,
    });

    // this.taskPagerComponent.onNext = this.taskPaginationHandler.onNext;
    // this.taskPagerComponent.onPrevious = this.taskPaginationHandler.onPrevious;
    // this.taskPagerComponent.addContainer("buttonContainer");

    // this.userService = new UserService(initialUserData);

    // this.userPager = new PagerComponent();
    // this.checkboxSelectComponent = new CheckboxSelectComponent();

    // this.userLogic = new UserLogic({
    //   userService: this.userService,
    //   pagerComponent: this.userPager,
    //   checkboxSelectComponent: this.checkboxSelectComponent,
    // });

    // this.userPager.onNext = this.userLogic.onNext;
    // this.userPager.onPrevious = this.userLogic.onPrevious;
    // this.userPager.addContainer("userPageControls");

    // this.checkboxSelectComponent.onClick = this.userLogic.onClick;
    // this.checkboxSelectComponent.addContainer("sendActionControl");

    // this.taskPage = new PaginationComponent(this.taskService);
    // this.sortTasksControl = new SortTasksControl(
    //   this.taskPage.sortingCriteria,
    //   this.taskPage.renderPage.bind(this.taskPage),
    // );
    // this.filterTasksControl = new FilterTasksControl(
    //   this.taskPage.filterCriteria,
    //   this.taskPage.renderPage.bind(this.taskPage),
    // );
  }

  init() {
    this.taskLogic.getPagination();
    // this.userLogic.getUsers();
  }
}

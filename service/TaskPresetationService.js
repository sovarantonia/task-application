import { initialTaskData } from "../data/initialTaskData.js";
import { TaskService } from "./TaskService.js";
import { PaginationComponent } from "../components/PaginationComponent.js";
import { dateParser } from "../helpers/dateHelper.js";
import { SortTasksControl } from "../components/SortTasksControl.js";
import { FilterTasksControl } from "../components/FilterTasksControl.js";
import { TaskLogic } from "../logic/TaskLogic.js";
import { SelectComponent } from "../components/SelectComponent.js";
import { PagerComponent } from "../components/PagerComponent.js";
export class TaskPresentationService {
  constructor() {
    initialTaskData.forEach((task) => {
      dateParser(task.creationDate);
    });
    this.taskService = new TaskService(initialTaskData);
    this.pager = new PagerComponent();
    this.select = new SelectComponent();
    this.taskLogic = new TaskLogic(this.taskService, this.pager, this.select);

    this.pager.onNext = this.taskLogic.onNext.bind(this.taskLogic);
    this.pager.onPrevious = this.taskLogic.onPrevious.bind(this.taskLogic);
    this.pager.addContainer("buttonContainer");
    this.select.options = [5, 10];
    this.select.renderSelect("itemsPerPageSelect");

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
  }
}

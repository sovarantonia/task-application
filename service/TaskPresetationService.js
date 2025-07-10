import { initialTaskData } from "../data/initialTaskData.js";
import { TaskService } from "./TaskService.js";
import { DbService } from "./DbService.js";
import { TaskPage } from "../components/TaskPage.js";
import { dateParser } from "../helpers/dateHelper.js";
import { SortTasksControl } from "../components/SortTasksControl.js";
import { FilterTasksControl } from "../components/FilterTasksControl.js";
export class TaskPresentationService {
  constructor() {
    initialTaskData.forEach((task) => {
      dateParser(task.creationDate);
    });
    this.dbService = new DbService(initialTaskData);
    this.taskService = new TaskService(this.dbService);

    this.taskPage = new TaskPage(this.taskService);
    this.sortTasksControl = new SortTasksControl(this.taskPage.sortingCriteria, this.taskPage.renderPage.bind(this.taskPage));
    this.filterTasksControl = new FilterTasksControl(this.taskPage.filterCriteria, this.taskPage.renderPage.bind(this.taskPage));
  }

  init() {
    this.taskPage.init();
    this.sortTasksControl.addEvents();
    this.filterTasksControl.init();
  }
}

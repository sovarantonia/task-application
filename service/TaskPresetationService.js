import { initialTaskData } from "../data/initialTaskData.js";
import { TaskService } from "./TaskService.js";
import { DbService } from "./DbService.js";
import { TaskPage } from "../components/TaskPage.js";

export class TaskPresentationService {
  constructor() {
    this.dbService = new DbService(initialTaskData);
    this.taskService = new TaskService(this.dbService);

    this.taskPage = new TaskPage(this.taskService);
  }

  init() {
    this.taskPage.init();
  }
}

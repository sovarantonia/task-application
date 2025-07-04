import { initialTaskData } from "./data/initialTaskData.js";
import { TaskService } from "./service/TaskService.js";
import {DbService} from "./service/DbService.js";
import { TaskPage } from "./components/TaskPage.js";
import { Pagination } from "./service/Pagination.js";


document.addEventListener("DOMContentLoaded", () => {
  const dbService = new DbService(initialTaskData);
  
  const taskService = new TaskService(dbService);
  const taskPagination = new Pagination(taskService.getAllTasks());
  const taskPage = new TaskPage(taskService);

  taskPage.renderPage(1);
  taskPage.renderPaginationControls();
});



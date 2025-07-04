import { initialTaskData } from "./data/initialTaskData.js";
import { TaskService } from "./service/TaskService.js";
import { DbService } from "./service/DbService.js";
import { TaskPage } from "./components/TaskPage.js";

document.addEventListener("DOMContentLoaded", () => {
  const dbService = new DbService(initialTaskData);
  const taskService = new TaskService(dbService);

  const taskPage = new TaskPage(taskService);
  taskPage.init();
});


import { initialTaskData } from "./data/initialTaskData.js";
import { TaskLogic } from "./logic/TaskLogic.js";

document.addEventListener("DOMContentLoaded", () => {
  const taskLogic = new TaskLogic({initialTaskData});
  // debugger;
  taskLogic.init();
});

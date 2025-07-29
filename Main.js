import { initialTaskData } from "./data/initialTaskData.js";
import { TaskLogic } from "./logic/TaskLogic.js";
import { UserLogic } from "./logic/UserLogic.js";
import { initialUserData } from "./data/initialUserData.js";

document.addEventListener("DOMContentLoaded", () => {
  const taskLogic = new TaskLogic({ initialTaskData });
  taskLogic.init();
  const userLogic = new UserLogic({ initialUserData });
  userLogic.init();
});

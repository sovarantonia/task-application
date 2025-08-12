import { initialTaskData } from "./data/initialTaskData.js";
import { TaskLogic } from "./logic/TaskLogic.js";
import { UserLogic } from "./logic/UserLogic.js";
import { initialUserData } from "./data/initialUserData.js";
import { LighDarkControlUI } from "./ui/LighDarkControlUI.js";
import { setTheme } from "./ui/setTheme.js";

document.addEventListener("DOMContentLoaded", () => {
  const lightDarkControl = new LighDarkControlUI({
    containerId: "lightDarkControl",
    onClick: () => setTheme({theme: "isDark"})
  });
  const taskLogic = new TaskLogic({ initialTaskData });
  taskLogic.init();
  const userLogic = new UserLogic({
    initialUserData,
    onUserListChanged: taskLogic.onUserListChanged,
  });
  userLogic.init();
});


import { TaskPresentationService } from "./service/TaskPresetationService.js";

document.addEventListener("DOMContentLoaded", () => {
  const taskPresentationService = new TaskPresentationService();
  taskPresentationService.init();
});

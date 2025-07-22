import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PaginationHandler } from "./PaginationHandler";

export class TaskLogic {
  constructor({ taskService = null } = {}) {
    this.taskService = taskService;

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getTasks, //or bind; this is an arrow function
      onPaginationResponse: this.onPaginationResponse,
    });

    this.taskPresentationUI = new TaskPresentationUI();
  }

  getPagination = () => {
    this.paginationHandler.getItems();
  };

  onPaginationResponse = ({ paginatedItems, totalPages }) => {
    this.taskPresentationUI.renderTasks(paginatedItems);
    this.taskPresentationUI.renderPageControls(totalPages);
  };

  init() {
    this.getPagination();
    this.taskPresentationUI.addContainer("taskPageControlBtn")
  }

}

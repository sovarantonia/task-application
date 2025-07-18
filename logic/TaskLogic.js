import { PagerComponent } from "../components/PagerComponent";
import { renderTasks } from "../ui/taskListRenderer";
import { PagerData } from "./PagerData";
import { PaginationHandler } from "./PaginationHandler";

export class TaskLogic {
  constructor({ taskService = null } = {}) {
    this.taskService = taskService;

    this.pagerData = new PagerData();
    // am nevoie de pager data aici ca functia are ca paramentru datele, trb sa ii dau ca param altcumva ------
    this.paginationHandler = new PaginationHandler({
      paginationFunction: () => this.taskService.getTasks({
        currentPage: this.pagerData.currentPageNo,
        itemsPerPage: this.pagerData.itemsPerPage,
      }),
      onPaginationResponse: this.onPaginationResponse,
    });
    this.result = {}
  }

  getPagination() {
    this.paginationHandler.getItems();
  }

  onPaginationResponse({ paginatedItems = [], totalPages = 0}) {
     this.result = { paginatedItems, totalPages }; //this does not work at all 
  }

}

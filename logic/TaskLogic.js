import { PagerComponentUI } from "../ui/PagerComponentUI";
import { TaskService } from "../service/TaskService";
import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PagerData } from "./PagerData";
import { PaginationHandler } from "./PaginationHandler";
import { SortTaskControlUI } from "../ui/SortTaskControlUI";
import { TaskSortCriteria } from "./TaskSortCriteria";

export class TaskLogic {
  constructor({ initialTaskData = [] } = {}) {
    this.taskService = new TaskService(initialTaskData);

    this.taskPresentationUI = new TaskPresentationUI("taskPageControlBtn");
    this.pagerComponentUI = new PagerComponentUI({
      containerId: "taskPerPageSelect",
    });
    this.sortTaskControlUI = new SortTaskControlUI({
      containerId: "sortTaskContainer",
    });

    this.pagerData = new PagerData();

    this.taskSortCriteria = new TaskSortCriteria();

    this.pagerComponentUI.onItemsPerPageChange = this.pagerData.setItemsPerPage;
    this.pagerComponentUI.onCurrentPageChange = this.pagerData.setCurrentPageNo;

    this.sortTaskControlUI.onSortByTitleCriteriaChanged =
      this.taskSortCriteria.setSortByTitleCriteria;
    this.sortTaskControlUI.onSortByDateCriteriaChanged =
      this.taskSortCriteria.setSortByDateCriteria;

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getTasks,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
      sortCriteria: this.taskSortCriteria,
    });
  }

  onPaginationResponse = ({ paginatedItems, totalPages }) => {
    this.pagerComponentUI.updateSelect(
      this.pagerData.currentPageNo,
      totalPages,
    );
    this.taskPresentationUI.renderTasks(
      { paginatedItems, totalPages },
      this.pagerData.currentPageNo,
    );
    this.sortTaskControlUI.setTitleArrow(
      this.taskSortCriteria.titleSortDirection,
    );
    this.sortTaskControlUI.setDateArrow(
      this.taskSortCriteria.dateSortDirection,
    );
  };

  init() {
    this.pagerData.init();
  }
}

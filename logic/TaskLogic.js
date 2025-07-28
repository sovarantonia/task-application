import { PagerComponentUI } from "../ui/PagerComponentUI";
import { TaskService } from "../service/TaskService";
import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PagerData } from "./PagerData";
import { PaginationHandler } from "./PaginationHandler";
import { SortTaskControlUI } from "../ui/SortTaskControlUI";
import { TaskSortCriteria } from "./TaskSortCriteria";
import { SortCriteria } from "./SortCriteria";
import { SortCriteriaHandler } from "./SortCriteriaHandler";

export class TaskLogic {
  constructor({ initialTaskData = [] } = {}) {
    this.taskService = new TaskService(initialTaskData);
    this.pagerData = new PagerData();

    this.taskPresentationUI = new TaskPresentationUI("taskPageControlBtn");
    this.pagerComponentUI = new PagerComponentUI({
      containerId: "taskPerPageSelect",
      onItemsPerPageChange: this.pagerData.setItemsPerPage,
      onCurrentPageChange: this.pagerData.setCurrentPageNo,
    });
    this.sortTaskControlUI = new SortTaskControlUI({
      containerId: "sortTaskContainer",
      onSortCriteriaChanged: (column) =>
        this.sortCriteriaHandler.onSortCriteriaChanged(column),
      columnList: ["title", "date"],
    });

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getTasks,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.sortCriteriaHandler = new SortCriteriaHandler({
      onNotifyPaginationHandler: (sortCriteria) => this.paginationHandler.onSortCriteriaChanged(sortCriteria),
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
    // this.sortTaskControlUI.setTitleArrow(
    //   this.taskSortCriteria.titleSortDirection,
    // );
    // this.sortTaskControlUI.setDateArrow(
    //   this.taskSortCriteria.dateSortDirection,
    // );
  };

  init() {
    this.pagerData.init();
  }
}

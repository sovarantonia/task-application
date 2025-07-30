import { PagerComponentUI } from "../ui/PagerComponentUI";
import { TaskService } from "../service/TaskService";
import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PagerData } from "./PagerData";
import { PaginationHandler } from "./PaginationHandler";
import { SortControlUI } from "../ui/SortControlUI";
import { SortCriteriaHandler } from "./SortCriteriaHandler";
import { FilterCriteriaHandler } from "./FilterCriteriaHandler";
import { FilterControlUI } from "../ui/FilterControlUI";
import { taskStatus } from "../data/taskStatus";
import { modify, transformOptionList } from "./transformOptionList";
import { initialUserData } from "../data/initialUserData";
export class TaskLogic {
  constructor({ initialTaskData = [] } = {}) {
    this.taskService = new TaskService(initialTaskData);
    this.pagerData = new PagerData();

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getTasks,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.sortCriteriaHandler = new SortCriteriaHandler({
      onNotifyPaginationHandler: this.paginationHandler.onSortCriteriaChanged,
    });

    this.filterCriteriaHandler = new FilterCriteriaHandler({
      onNotifyPaginationHandler: 
        this.paginationHandler.onFilterCriteriaChanged,
    });

    this.taskPresentationUI = new TaskPresentationUI("taskPageIndicator");

    this.pagerComponentUI = new PagerComponentUI({
      containerId: "taskPerPageSelect",
      onItemsPerPageChange: this.pagerData.setItemsPerPage,
      onCurrentPageChange: this.pagerData.setCurrentPageNo,
    });

    this.sortTaskControlUI = new SortControlUI({
      containerId: "sortTaskContainer",
      onSortCriteriaChanged: this.sortCriteriaHandler.onSortCriteriaChanged,
      columnList: ["title", "date"],
    });
    this.filterTaskControlUI = new FilterControlUI({
      containerId: "filterTaskContainer",
      onFilterCriteriaChanged:
        this.filterCriteriaHandler.onFilterCriteriaChanged,
      columnOptionList: [taskStatus, initialUserData],
      keyValue: [
        { key: "id", value: "status" },
        { key: "id", value: "user" },
      ],
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

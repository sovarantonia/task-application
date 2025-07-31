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
import { initialUserData } from "../data/initialUserData";
export class TaskLogic {
  constructor({ initialTaskData = [] } = {}) {
    this.taskService = new TaskService(initialTaskData);
    this.pagerData = new PagerData();

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getPaginatedTasks,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.sortCriteriaHandler = new SortCriteriaHandler({
      onNotifyPaginationHandler: this.paginationHandler.onSortCriteriaChanged,
    });

    this.filterCriteriaHandler = new FilterCriteriaHandler({
      onNotifyPaginationHandler: this.paginationHandler.onFilterCriteriaChanged,
    });

    this.taskPresentationUI = new TaskPresentationUI("taskPageIndicator");

    const { setItemsPerPage, setCurrentPageNo } = this.pagerData;
    this.pagerComponentUI = new PagerComponentUI({
      containerId: "taskPerPageSelect",
      onItemsPerPageChange: setItemsPerPage,
      onCurrentPageChange: setCurrentPageNo,
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

  onPaginationResponse = ({
    paginatedItems,
    totalPages,
    currentPageNo,
    itemsPerPage,
  }) => {
    this.pagerComponentUI.updateSelect({ currentPageNo, totalPages });
    this.taskPresentationUI.renderTasks({ paginatedItems });
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

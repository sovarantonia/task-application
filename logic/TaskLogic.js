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
      columnList : ["title", "date"]
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
      columnMap: this.sortCriteriaHandler.sortCriteriaInstances,
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

    this.userMap = new Map(initialUserData.map((user) => [user.id, user.user]));
    this.statusMap = new Map(taskStatus.map((status) => [status.id, status.status]));
  }

  onPaginationResponse = ({
    paginatedItems,
    totalPages,
    currentPageNo,
    itemsPerPage,
  }) => {
    this.pagerComponentUI.updateSelect({ currentPageNo, totalPages });
    this.taskPresentationUI.renderTasks({ paginatedItems, userMap: this.userMap, statusMap: this.statusMap });
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

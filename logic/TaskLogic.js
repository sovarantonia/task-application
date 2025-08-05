import { PagerComponentUI } from "../ui/PagerComponentUI";
import { TaskService } from "../service/TaskService";
import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PagerData } from "./pager/PagerData";
import { PaginationHandler } from "./pager/PaginationHandler";
import { SortControlUI } from "../ui/SortControlUI";
import { SortCriteriaHandler } from "../logic/sort/SortCriteriaHandler";
import { FilterCriteriaHandler } from "../logic/filter/FilterCriteriaHandler";
import { FilterControlUI } from "../ui/FilterControlUI";
import { taskStatus } from "../data/taskStatus";
import { initialUserData } from "../data/initialUserData";
import { CreateTaskModalUI } from "../ui/CreateTaskModalUI.js";
import { FormHandler } from "./FormHandler.js";
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
      columnList: ["title", "date"],
    });

    this.filterCriteriaHandler = new FilterCriteriaHandler({
      onNotifyPaginationHandler: this.paginationHandler.onFilterCriteriaChanged,
    });

    this.formHandler = new FormHandler({
      sendTheDataFunction: (obj) => this.taskService.saveTask({ newTask: obj }),
      onDataSent: () => {
        this.paginationHandler.getPaginatedItems();
        this.createTaskModalUI.closeModal();
      },
    });

    this.taskPresentationUI = new TaskPresentationUI({
      containerId: "taskPageIndicator",
    });

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

    this.createTaskModalUI = new CreateTaskModalUI({
      containerId: "createTaskContainer",
      onSubmit: this.formHandler.handleFormData,
    });

    this.userMap = new Map(initialUserData.map((user) => [user.id, user.user]));
    this.statusMap = new Map(
      taskStatus.map((status) => [status.id, status.status]),
    );
  }

  onPaginationResponse = ({
    paginatedItems,
    totalPages,
    currentPageNo,
    itemsPerPage,
  }) => {
    this.pagerComponentUI.updateSelect({ currentPageNo, totalPages });
    this.taskPresentationUI.renderTasks({
      paginatedItems,
      userMap: this.userMap,
      statusMap: this.statusMap,
    });
  };

  init() {
    this.pagerData.init();
  }
}

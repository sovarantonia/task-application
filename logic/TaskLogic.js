import { PagerComponentUI } from "../ui/PagerComponentUI";
import { TaskService } from "../service/TaskService";
import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PagerData } from "./pagination/PagerData.js";
import { PaginationHandler } from "./pagination/PaginationHandler.js";
import { SortControlUI } from "../ui/SortControlUI";
import { SortCriteriaHandler } from "../logic/sort/SortCriteriaHandler";
import { FilterCriteriaHandler } from "../logic/filter/FilterCriteriaHandler";
import { FilterControlUI } from "../ui/FilterControlUI";
import { taskStatus } from "../data/taskStatus";
import { initialUserData } from "../data/initialUserData";
import { CreateTaskModalUI } from "../ui/CreateTaskModalUI.js";
import { handleFormData } from "./FormHandler.js";
import { ViewTaskUI } from "../ui/ViewTaskUI.js";
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

    this.taskPresentationUI = new TaskPresentationUI({
      containerId: "taskPaginationContainer",
      onViewClick: (item) => this.viewTaskUI.onViewItem(item),
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
      onSubmit: ({ formData }) => {
        handleFormData({
          sendTheDataFunction: (item) =>
            this.taskService.saveTask({ newTask: item }),
          onDataSent: () => {
            this.createTaskModalUI.closeModal();
            this.paginationHandler.getPaginatedItems();
          },
          formData,
        });
      },
    });

    this.viewTaskUI = new ViewTaskUI({
      containerId: "viewTask",
      userAssignList: this.userList, // should have an event to notify
      onSubmit: ({ formData, item }) => {
        handleFormData({
          sendTheDataFunction: (item) =>
            this.taskService.updateTask({ task: item }),
          onDataSent: () => {
            this.viewTaskUI.closeView();
            this.paginationHandler.getPaginatedItems();
          },
          formData,
          item,
        });
      },
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

  onUserListChanged = ({ userList }) => {
    this.userList = userList; 
    this.userMap = new Map(this.userList.map((user) => [user.id, user.user]));
    
    this.viewTaskUI.onAssignUserListChanged({ assignUserList: this.userList });
  };

  init() {
    this.pagerData.init();
  }
}

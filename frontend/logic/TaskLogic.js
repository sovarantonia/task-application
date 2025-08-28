import { PagerComponentUI } from '../ui/PagerComponentUI.js';
import { TaskService } from '../service/TaskService.js';
import { TaskPresentationUI } from '../ui/TaskPresentationUI.js';
import { PagerData } from './pagination/PagerData.js';
import { PaginationHandler } from './pagination/PaginationHandler.js';
import { SortControlUI } from '../ui/SortControlUI.js';
import { SortCriteriaHandler } from '../logic/sort/SortCriteriaHandler.js';
import { FilterCriteriaHandler } from '../logic/filter/FilterCriteriaHandler.js';
import { FilterControlUI } from '../ui/FilterControlUI.js';
import { taskStatus } from '../data/taskStatus.js';
import { initialUserData } from '../data/initialUserData.js';
import { CreateTaskUI } from '../ui/CreateTaskUI.js';
import { handleFormData } from './FormHandler.js';
import { ViewTaskUI } from '../ui/ViewTaskUI.js';
import {
  addTask,
  getAllStatuses,
  getAllUsers,
  getPaginatedTasks,
  updateTask,
} from '../service/api.js';
export class TaskLogic {
  constructor({ initialTaskData = [] } = {}) {
    this.taskService = new TaskService(initialTaskData);
    this.pagerData = new PagerData({});

    this.paginationHandler = new PaginationHandler({
      paginationFunction: getPaginatedTasks,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.sortCriteriaHandler = new SortCriteriaHandler({
      onNotifyPaginationHandler: this.paginationHandler.onSortCriteriaChanged,
      columnList: ['title', 'creationDate'],
    });

    this.filterCriteriaHandler = new FilterCriteriaHandler({
      onNotifyPaginationHandler: this.paginationHandler.onFilterCriteriaChanged,
    });

    this.taskPresentationUI = new TaskPresentationUI({
      containerId: 'taskPaginationContainer',
      onViewClick: (item) => this.viewTaskUI.onViewItem(item),
    });

    const { setItemsPerPage, setCurrentPageNo } = this.pagerData;
    this.pagerComponentUI = new PagerComponentUI({
      containerId: 'taskPerPageSelect',
      onItemsPerPageChange: setItemsPerPage,
      onCurrentPageChange: setCurrentPageNo,
    });

    this.sortTaskControlUI = new SortControlUI({
      containerId: 'sortTaskContainer',
      onSortCriteriaChanged: this.sortCriteriaHandler.onSortCriteriaChanged,
      columnMap: this.sortCriteriaHandler.sortCriteriaInstances,
    });

    this.filterTaskControlUI = new FilterControlUI({
      containerId: 'filterTaskContainer',
      onFilterCriteriaChanged:
        this.filterCriteriaHandler.onFilterCriteriaChanged,
      columnOptionList: [taskStatus, initialUserData],
      keyValue: [
        { key: 'id', foreignKey: 'statusId', columnName: 'Status' },
        { key: 'id', foreignKey: 'userId', columnName: 'User' },
      ],
    });

    this.createTaskUI = new CreateTaskUI({
      containerId: 'createTaskContainer',
      onSubmit: ({ formData }) => {
        handleFormData({
          sendTheDataFunction: (item) => addTask(item),
          onDataSent: () => {
            this.createTaskUI.closeModal();
            this.paginationHandler.getPaginatedItems();
          },
          formData,
        });
      },
    });

    this.viewTaskUI = new ViewTaskUI({
      containerId: 'viewTask',
      onSubmit: ({ formData, item }) => {
        handleFormData({
          sendTheDataFunction: (item) =>
            updateTask(item.id, item),
          onDataSent: () => {
            this.viewTaskUI.closeView();
            this.paginationHandler.getPaginatedItems();
          },
          formData,
          item,
        });
      },
    });
  }

  onPaginationResponse = ({ paginatedItems, totalPages, currentPageNo }) => {
    Promise.all([getAllStatuses(), getAllUsers()]).then(([statuses, users]) => {
      let statusMap = new Map(statuses.map((s) => [s.id, s.statusName]));
      let userMap = new Map(users.map((u) => [u.id, u.name]));

      this.taskPresentationUI.renderTasks({
        paginatedItems,
        userMap,
        statusMap,
      });
    });
    this.pagerComponentUI.updateSelect({ currentPageNo, totalPages });
  };

  onUserListChanged = () => {
    getAllUsers().then((users) => {
      this.userData = users.map((u) => ({ id: u.id, user: u.name }));
      this.viewTaskUI.onAssignUserListChanged({
        assignUserList: this.userData,
      });
      this.filterTaskControlUI.onFilterOptionsChanged({
        columnOptionList: [this.taskStatus, this.userData],
        keys: [
          { keyColumn: 'id', valueColumn: 'status' },
          { keyColumn: 'id', valueColumn: 'user' },
        ],
      });
      this.createTaskUI.onAssignUserListChanged({
        assignUserList: this.userData,
      });
    });
  };

  init() {
    this.pagerData.init();
    Promise.all([getAllStatuses(), getAllUsers()]).then(([statuses, users]) => {
      this.taskStatus = statuses.map((s) => ({
        id: s.id,
        status: s.statusName,
      }));
      this.userData = users.map((u) => ({ id: u.id, user: u.name }));

      this.filterTaskControlUI.onFilterOptionsChanged({
        columnOptionList: [this.taskStatus, this.userData],
        keys: [
          { keyColumn: 'id', valueColumn: 'status' },
          { keyColumn: 'id', valueColumn: 'user' },
        ],
      });

      this.viewTaskUI.onAssignUserListChanged({
        assignUserList: this.userData,
      });

      this.createTaskUI.onAssignUserListChanged({
        assignUserList: this.userData,
      });
    });
  }
}

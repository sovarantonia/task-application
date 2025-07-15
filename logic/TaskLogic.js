import { renderTasks } from "../ui/taskListRenderer";

export class TaskLogic {
  constructor({
    taskService = null,
    pagerComponent = null,
    itemsPerPageSelector = null,
  } = {}) {
    this.taskService = taskService;

    itemsPerPageSelector.onChangeFunction = this.setItemsPerPage;
    this.currentPage = 1;
    this.itemsPerPage = 5;

    this.taskRenderer = renderTasks("paginationContainer");

    this.pager = pagerComponent;
  }

  setItemsPerPage = (itemNrPerPage) =>  {
    this.itemsPerPage = parseInt(itemNrPerPage);
    this.currentPage = 1;
    this.getPagination();
  }

  getPagination() {
    const paginationRequest = {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };
    this.taskService
      .getTasks(paginationRequest)
      .then(({ paginatedItems, totalPages }) => {
        this.taskRenderer(paginatedItems);
        this.totalPages = totalPages;
        this.pager.renderPaginationResults({
          totalPages: totalPages,
          currentPage: this.currentPage,
        });
      });
  }

  onNext = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.getPagination();
  };

  onPrevious = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.getPagination();
  };
}

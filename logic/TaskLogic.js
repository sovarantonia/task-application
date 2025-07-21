import { PaginationHandler } from "./PaginationHandler";

export class TaskLogic {
  constructor({ taskService = null } = {}) {
    this.taskService = taskService;

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getTasks, //or bind; this is an arrow function
      onPaginationResponse: this.onPaginationResponse,
    });
    this.result = {};
  }

  getPagination = () => {
    // debugger;
   
    this.paginationHandler.getItems();
    // debugger;
    // .then(({paginatedItems, totalPages}) => {
    //   this.onPaginationResponse({paginatedItems, totalPages});
    // })
    // .then(this.getResponse);
    return result;
  };

  onPaginationResponse = ({ paginatedItems, totalPages }) => {
    // debugger;

    this.result = { list: paginatedItems, totalPages: totalPages };

    // issue related to promise
    // return this.result;
  };

  getResponse = () => {
    // debugger;
    return this.result;
  };
}

import { PagerComponent } from "../components/PagerComponent";
import { renderTasks } from "../ui/taskListRenderer";
import { PaginationHandler } from "./PaginationHandler";

export class TaskLogic {
  constructor({ taskService = null } = {}) {
    this.taskService = taskService;
    this.pagerComponent = new PagerComponent();
    this.paginationHandler = new PaginationHandler({
      pagerComponent: this.pagerComponent,
      renderFunction: renderTasks("paginationContainer"),
    });
    this.paginationData = this.pagerComponent.paginationData;
    this.paginationHandler.paginationFunction = () => this.taskService.getTasks(this.paginationData)
    this.paginationHandler.pagerComponent = this.pagerComponent;

    this.pagerComponent.addContainer("buttonContainer")
    // this.paginationHandler = paginationHandler;

  }


  getPagination() {
    this.paginationHandler.getItems();

    // maybe here pass the pagination function to handler
    // this.taskService
    //   .getTasks(this.paginationData)
    //   .then(({ paginatedItems, totalPages }) => {
    //     this.taskRenderer(paginatedItems); // send this to pager component
    //     this.totalPages = totalPages;
    //     this.pager.renderPaginationResults({
    //       totalPages: totalPages,
    //       currentPage: this.paginationData.currentPage,
    //     });
    //   });
  }
}

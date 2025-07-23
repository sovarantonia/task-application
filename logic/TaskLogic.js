import { PagerComponentUI } from "../ui/PagerComponentUI";
import { TaskService } from "../service/TaskService";
import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PagerData } from "./PagerData";
import { PaginationHandler } from "./PaginationHandler";

export class TaskLogic {
  constructor({ initialTaskData = [] } = {}) {
    this.taskService = new TaskService(initialTaskData);
    this.taskPresentationUI = new TaskPresentationUI();
    this.pagerComponentUI = new PagerComponentUI();
    this.pagerData = new PagerData();

    this.pagerComponentUI.onItemsPerPageChange = this.pagerData.setItemsPerPage;
    this.pagerComponentUI.onCurrentPageChange = this.pagerData.setCurrentPageNo;

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getTasks,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.pagerData.onPagerDataChanged = () =>
      this.paginationHandler.getItems(this.pagerData);
  }

  onPaginationResponse = ({ paginatedItems, totalPages }) => {
    // this.pagerComponentUI.selectCurrentPageNo.options = 
    // debugger;
    // this.pagerComponentUI.renderSelectCurrentPageNo(
    //   Array.from({ length: totalPages }, (_, i) => i + 1),
    // );
    // console.log(Array.from({ length: totalPages }, (_, i) => i + 1));
    this.taskPresentationUI.renderTasks(paginatedItems);
    this.taskPresentationUI.renderPageControls(
      this.pagerData.currentPageNo,
      totalPages,
    );
  };

  init() {
    this.pagerData.init();
    this.taskPresentationUI.addContainer("taskPageControlBtn");
    this.pagerComponentUI.addContainer("taskPerPageSelect");
  }
}

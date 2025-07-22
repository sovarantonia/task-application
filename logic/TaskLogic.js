import { CreateElementComponent } from "../components/CreateElementComponent";
import { PagerComponent } from "../components/PagerComponent";
import { TaskPresentationUI } from "../ui/TaskPresentationUI";
import { PagerData } from "./PagerData";
import { PaginationHandler } from "./PaginationHandler";

export class TaskLogic {
  constructor({ taskService = null } = {}) {
    this.taskService = taskService;

    this.taskPresentationUI = new TaskPresentationUI();
    this.pagerComponent = new PagerComponent({ selectOptions: [5, 10] });
    this.pagerData = new PagerData();

    this.createElementComponent = new CreateElementComponent();
    this.selectItemsPerPage = this.createElementComponent.createSelect({
      options: [5, 10],
      eventToAdd: (e) => this.pagerData.setItemsPerPage(e.target.value),
    });

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.taskService.getTasks, //or bind; this is an arrow function
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.pagerData.onPagerDataChanged = this.paginationHandler.getItems
    
    this.pagerComponent.container.append(this.selectItemsPerPage)
  }

  getPagination = () => {
    this.paginationHandler.getItems();
  };

  onPaginationResponse = ({ paginatedItems, totalPages }) => {
    this.taskPresentationUI.renderTasks(paginatedItems);
    this.taskPresentationUI.renderPageControls(totalPages);
  };

  init() {
    this.getPagination();
    this.taskPresentationUI.addContainer("taskPageControlBtn");
    this.pagerComponent.addContainer("taskPerPageSelect");
  }
}

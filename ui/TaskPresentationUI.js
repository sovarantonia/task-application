import { renderTasks } from "../ui/taskListRenderer";
import { CreateElementComponent } from "../components/CreateElementComponent";
export class TaskPresentationUI {
  constructor(containerId) {
    this.createElementComponent = new CreateElementComponent(containerId);
    this.pageIndicator = this.createElementComponent.createElement({elementType: "span"});
  }

  renderTasks = ({ paginatedItems, totalPages }, currentPageNo) => {
    renderTasks("taskPaginationContainer", paginatedItems);
    this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
  };
}

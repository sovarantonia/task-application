import { renderTasks } from "../ui/taskListRenderer";
import { CreateElementComponent } from "../components/CreateElementComponent";
export class TaskPresentationUI {
  constructor(containerId) {
    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();
    this.pageIndicator = this.createElementComponent.createSpan();

    this.target = document.getElementById(containerId);
    this.target.appendChild(this.container);
    this.container.append(this.pageIndicator);
  }

  renderTasks = ({ paginatedItems, totalPages }, currentPageNo) => {
    renderTasks("taskPaginationContainer", paginatedItems);
    this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
  };
}

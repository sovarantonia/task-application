import { renderTasks } from "../ui/taskListRenderer";
import { CreateElementComponent } from "../components/CreateElementComponent";
export class TaskPresentationUI {
  constructor() {
    this.taskRenderer = renderTasks("taskPaginationContainer");

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();
    this.pageIndicator = this.createElementComponent.createSpan();
  }

  renderTasks = ({paginatedItems, totalPages}, currentPageNo) => {
    this.taskRenderer(paginatedItems);
    this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
  };


  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
    this.container.append(this.pageIndicator);
  }
}

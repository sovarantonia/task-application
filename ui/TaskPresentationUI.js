import { renderTasks } from "../ui/taskListRenderer";
import { CreateElementComponent } from "../components/CreateElementComponent";
export class TaskPresentationUI {
  constructor() {
    this.taskRenderer = renderTasks("taskPaginationContainer");

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();
    this.pageIndicator = this.createElementComponent.createSpan();
  }

  renderTasks = (taskList) => {
    this.taskRenderer(taskList);
  };

  renderPageControls = (totalPages) => {
    this.pageIndicator.textContent = `Page ${1} of ${totalPages}`;
  };

  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
    this.container.append(this.pageIndicator);
  }

}

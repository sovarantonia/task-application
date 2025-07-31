import { renderTasks } from "../ui/taskListRenderer";
import { createElementComponent } from "../components/createElementComponentFunction";
export class TaskPresentationUI {
  constructor(containerId) {
    const target = document.getElementById(containerId);
    this.pageIndicator = createElementComponent({
      elementType: "span",
    });
    target.append(this.pageIndicator);
  }

  renderTasks = ({ paginatedItems }) => {
    renderTasks("taskPaginationContainer", paginatedItems);
  };
}

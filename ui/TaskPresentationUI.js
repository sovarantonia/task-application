import { renderTasks } from "../ui/taskListRenderer";
import { createElementComponent } from "../components/createElementComponent";
export class TaskPresentationUI {
  constructor({ containerId }) {
    const target = document.getElementById(containerId);
    this.pageIndicator = createElementComponent({
      elementType: "span",
    });
    target.append(this.pageIndicator);
  }

  renderTasks = ({ paginatedItems, userMap, statusMap }) => {
    renderTasks({
      containerId: "taskPaginationContainer",
      taskList: paginatedItems,
      userMap,
      statusMap,
    });
  };
}

import { renderTasks } from "../ui/taskListRenderer.js";
export class TaskPresentationUI {
  constructor({ containerId, onViewClick }) {
    this.containerId = containerId
    this.onViewClick = onViewClick;
  }

  renderTasks = ({ paginatedItems, userMap, statusMap }) => {
    renderTasks({
      containerId: this.containerId,
      taskList: paginatedItems,
      userMap,
      statusMap,
      onClick: (item) => this.onViewClick(item)
    });
  };
}

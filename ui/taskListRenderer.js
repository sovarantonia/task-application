import { createButton } from "../components/ButtonComponent.js";
import { createElementComponent } from "../components/createElementComponent.js";

export function renderTasks({
  containerId,
  taskList,
  userMap,
  statusMap,
  onClick = null,
}) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  taskList.forEach((element) => {
    const user = userMap.get(element.user);
    const status = statusMap.get(element.status);

    const card = createElementComponent({ elementType: "div" });
    card.className = "task-card";
    const viewButton = createButton({
      text: "Edit task",
      onClick: () => onClick(element),
    });

    const title = createElementComponent({
      elementType: "h2",
      text: element.title,
    });
    const statusP = createElementComponent({
      elementType: "p",
      text: `Status: ${status}`,
    });
    const description = createElementComponent({
      elementType: "p",
      text: element.description,
    });
    const assignedTo = createElementComponent({
      elementType: "p",
      text: `Assigned to: ${user}`,
    });
    const createdAt = createElementComponent({
      elementType: "p",
      text: `Created at: ${element.date}`,
    });

    card.append(title, statusP, description, assignedTo, createdAt, viewButton);
    container.appendChild(card);
  });

  return taskList;
}

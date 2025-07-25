export function renderTasks(containerId, taskList) {
  const container = document.getElementById(containerId);
    container.innerHTML = "";

    taskList.forEach((element) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `<h2>${element.title}</h2>
        <p>Status: ${element.status}</p>
        <p>${element.description}</p>
        <p>Assigned to: ${element.userName}</p>
        <p>Created at: ${element.creationDate}</p>`;
      container.appendChild(card);
    });
    return taskList;
}

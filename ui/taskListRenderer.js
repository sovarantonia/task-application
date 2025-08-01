export function renderTasks({containerId, taskList, userMap, statusMap}) {
  const container = document.getElementById(containerId);
    container.innerHTML = "";
    taskList.forEach((element) => {
      const user = userMap.get(element.user);
      const status = statusMap.get(element.status);
      
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `<h2>${element.title}</h2>
        <p>Status: ${status}</p>
        <p>${element.description}</p>
        <p>Assigned to: ${user}</p>
        <p>Created at: ${element.date}</p>`;
      container.appendChild(card);
    });
    return taskList;
}

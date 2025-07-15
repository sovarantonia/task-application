export function renderTasks(containerId) {
  const container = document.getElementById(containerId);

  return (tasks) => {
    container.innerHTML = "";

    tasks.forEach((element) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `<h2>${element.title}</h2>
        <p>Status: ${element.status}</p>
        <p>${element.description}</p>
        <p>Assigned to: ${element.userName}</p>
        <p>Created at: ${element.creationDate}</p>`;
      container.appendChild(card);
    });
  };
}

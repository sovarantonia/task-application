import { CreateElementComponent } from "../components/CreateElementComponent";

export function renderUsers(containerId) {
  const container = document.getElementById(containerId);
  const createElementComponent = new CreateElementComponent();

  return (users, eventToAdd = null) => {
    container.innerHTML = "";

    users.forEach((element) => {
      const card = createElementComponent.createDiv();
      card.className = "user-card";
      const checkbox = createElementComponent.createCheckbox({
        value: element.id,
        eventToAdd: (e) => {
          eventToAdd?.(e.target.value, e.target.checked);
        },
      });
      checkbox.id = element.id;
      const nameInfo = createElementComponent.createP(`${element.userName}`);
      const emailInfo = createElementComponent.createP(
        `Email: ${element.email}`,
      );
      const departmentInfo = createElementComponent.createP(
        `Department: ${element.department}`,
      );

      card.append(checkbox, nameInfo, emailInfo, departmentInfo);
      container.appendChild(card);
    });
  };
}

export function getCheckboxesState(checkboxState) {
  for (const id of checkboxState.keys()) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.checked = checkboxState.get(id);
    }
  }
}

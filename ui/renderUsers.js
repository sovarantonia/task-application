import { CreateElementComponent } from "../components/CreateElementComponent";

export function renderUsers(users, containerId) {
  const container = document.getElementById(containerId);
  const createElementComponent = new CreateElementComponent(containerId);

  container.innerHTML = "";

  users.forEach((element) => {
    const card = createElementComponent.createElement({ elementType: "div" });
    card.className = "user-card";
    // const checkbox = createElementComponent.createCheckbox({
    //   value: element.id,
    //   eventToAdd: (e) => {
    //     eventToAdd?.(e.target.value, e.target.checked);
    //   },
    // });
    // checkbox.id = element.id;
    const nameInfo = createElementComponent.createElement({
      elementType: "p",
      text: `${element.name}`,
    });
    const emailInfo = createElementComponent.createElement({
      elementType: "p",
      text: `Email: ${element.email}`,
    });
    const departmentInfo = createElementComponent.createElement({
      elementType: "p",
      text: `Department: ${element.department}`,
    });

    card.append(nameInfo, emailInfo, departmentInfo);
    container.appendChild(card);
  });
  return users;
}

export function getCheckboxesState(checkboxState) {
  for (const id of checkboxState.keys()) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.checked = checkboxState.get(id);
    }
  }
}

import { createElementComponent } from "../components/createElementComponentFunction";

export function renderUsers({userList, containerId}) {
  const container = document.getElementById(containerId);
  // const createElementComponent = new CreateElementComponent(containerId);

  container.innerHTML = "";

  userList.forEach((element) => {
    const card = createElementComponent({ elementType: "div" });
    card.className = "user-card";
    // const checkbox = createElementComponent.createCheckbox({
    //   value: element.id,
    //   eventToAdd: (e) => {
    //     eventToAdd?.(e.target.value, e.target.checked);
    //   },
    // });
    // checkbox.id = element.id;
    const nameInfo = createElementComponent({
      elementType: "p",
      text: `${element.user}`,
    });
    const emailInfo = createElementComponent({
      elementType: "p",
      text: `Email: ${element.email}`,
    });
    const departmentInfo = createElementComponent({
      elementType: "p",
      text: `Department: ${element.department}`,
    });

    card.append(nameInfo, emailInfo, departmentInfo);
    container.appendChild(card);
  });
  return userList;
}

export function getCheckboxesState(checkboxState) {
  for (const id of checkboxState.keys()) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.checked = checkboxState.get(id);
    }
  }
}

import { CheckboxComponent } from "../components/CheckboxComponent";
import { createElementComponent } from "../components/createElementComponent";

export function renderUsers({
  userList,
  containerId,
  onCheckboxChecked = null,
}) {
  const container = document.getElementById(containerId);
  const checkbox = new CheckboxComponent();
  container.innerHTML = "";

  userList.forEach((element) => {
    const card = createElementComponent({ elementType: "div" });
    card.className = "user-card";

    const userCheckbox = checkbox.createCheckbox({
      value: element.id,
      eventToAdd: (e) => onCheckboxChecked({id :e.target.value, isChecked :e.target.checked}),
    });
    
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

    card.append(userCheckbox, nameInfo, emailInfo, departmentInfo);
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

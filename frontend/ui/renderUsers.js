import { createCheckbox } from "../components/CheckboxComponent";
import { createElementComponent } from "../components/CreateElementComponent";

export function renderUsers({
  userList,
  containerId,
  onCheckboxChecked = null,
}) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  userList.forEach((element) => {
    const card = createElementComponent({ elementType: "div" });
    card.classList.add("card", "user")

    const userCheckbox = createCheckbox({
      id: element.id,
      value: element.id,
      onChange: (e) =>
        onCheckboxChecked({
          id: e.target.value,
          name: element.user,
          email: element.email,
          isChecked: e.target.checked,
        }),
    });

    const nameInfo = createElementComponent({
      elementType: "h3",
      text: `${element.name}`,
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
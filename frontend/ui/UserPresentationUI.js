import { renderUsers } from "./renderUsers.js";

export class UserPresentationUI {
  constructor({ containerId, onCheckboxChecked = null }) {
    this.containerId = containerId;
    this.onCheckboxChecked = onCheckboxChecked;
  }

  renderUsers = ({ paginatedItems }) => {
    renderUsers({
      userList: paginatedItems,
      containerId: this.containerId,
      onCheckboxChecked: this.onCheckboxChecked,
    });
  };

  renderCheckedCheckboxes = ({ checkboxState }) => {
    for (const user of checkboxState.keys()) {
      const id = user.id;
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.checked = checkboxState.get(id).isChecked;
      }
    }
  };
}

import { renderUsers } from "./renderUsers";

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
}

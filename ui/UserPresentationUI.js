import { renderUsers } from "./renderUsers";

export class UserPresentationUI {
  constructor(containerId) {
    this.containerId = containerId;
  }

  renderUsers = ({ paginatedItems }) => {
    renderUsers({ userList: paginatedItems, containerId: this.containerId });
  };
}

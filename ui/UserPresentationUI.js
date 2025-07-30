import { renderUsers } from "./renderUsers";

export class UserPresentationUI {
  constructor(containerId) {
    this.containerId = containerId;
  }

  renderUsers = ({ paginatedItems, totalPages }, currentPageNo) => {
    renderUsers(paginatedItems, this.containerId);
  };
}

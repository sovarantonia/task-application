import { CreateElementComponent } from "../components/CreateElementComponent";
import { renderUsers } from "./renderUsers";

export class UserPresentationUI {
  constructor(containerId) {
    this.createElement = new CreateElementComponent(containerId);
    this.pageIndicator = this.createElement.createElement({
      elementType: "span",
    });
    this.containerId = containerId;
  }

  renderUsers = ({ paginatedItems, totalPages }, currentPageNo) => {
    renderUsers(paginatedItems, this.containerId);
    this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
  };
}

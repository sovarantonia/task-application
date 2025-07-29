import { CreateElementComponent } from "../components/CreateElementComponent";
import { updateSelectOptions } from "../logic/updateSelect";

//** This renders the items per page and current page select */
export class PagerComponentUI {
  constructor({
    onItemsPerPageChange = null,
    onCurrentPageChange = null,
    containerId,
  } = {}) {
    this.onItemsPerPageChange = onItemsPerPageChange;
    this.onCurrentPageChange = onCurrentPageChange;

    this.createElementComponent = new CreateElementComponent(containerId);

    this.selectItemsPerPageSpan = this.createElementComponent.createElement({
      elementType: "span",
      text: "Items per page",
    });

    this.selectItemsPerPage = this.createElementComponent.createElement({
      elementType: "select",
      options: [5, 10],
      eventToAdd: (e) => this.onItemsPerPageChange(parseInt(e.target.value)),
    });

    this.selectCurrentPageSpan = this.createElementComponent.createElement({
      elementType: "span",
      text: "Page",
    });

    this.selectCurrentPageNo = this.createElementComponent.createElement({
      elementType: "select",
      eventToAdd: (e) => this.onCurrentPageChange(parseInt(e.target.value)),
    });
  }

  updateSelect(currentPageNo, totalPages) {
    updateSelectOptions(
      this.selectCurrentPageNo,
      Array.from({ length: totalPages }, (_, i) => i + 1),
      currentPageNo,
    );
  }
}

import { CreateElementComponent } from "../components/CreateElementComponent";
import { SelectComponent } from "../components/SelectComponent";
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
    this.target = document.getElementById(containerId);

    this.select = new SelectComponent();

    this.selectItemsPerPage = this.select.createSelect({
      list: [5, 10],
      onSelectionChanged: (e) =>
        this.onItemsPerPageChange(parseInt(e.target.value)),
    });

    this.selectItemsPerPageSpan = this.createElementComponent.createElement({
      elementType: "span",
      text: "Items per page",
    });

    this.target.append(this.selectItemsPerPage);

    this.selectCurrentPageSpan = this.createElementComponent.createElement({
      elementType: "span",
      text: "Page",
    });

    this.selectCurrentPageNo = this.select.createSelect({
      onSelectionChanged: (e) =>
        this.onCurrentPageChange(parseInt(e.target.value)),
    });
    this.target.append(this.selectCurrentPageNo);
  }

  updateSelect(currentPageNo, totalPages) {
    updateSelectOptions(
      this.selectCurrentPageNo,
      Array.from({ length: totalPages }, (_, i) => i + 1),
      currentPageNo,
    );
  }
}

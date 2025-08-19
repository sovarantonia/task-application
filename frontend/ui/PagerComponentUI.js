import { createElementComponent } from "../components/createElementComponent";
import { SelectComponent } from "../components/SelectComponent";
import { updatePageSelectOptions } from "../logic/updatePageSelect";

//** This renders the items per page and current page select */
export class PagerComponentUI {
  constructor({
    onItemsPerPageChange = null,
    onCurrentPageChange = null,
    containerId,
  } = {}) {
    this.onItemsPerPageChange = onItemsPerPageChange;
    this.onCurrentPageChange = onCurrentPageChange;

    const target = document.getElementById(containerId);

    const select = new SelectComponent();

    this.selectItemsPerPage = select.createSelect({
      list: [5, 10],
      onSelectionChanged: (e) =>
        this.onItemsPerPageChange(parseInt(e.target.value)),
    });

    this.selectItemsPerPageSpan = createElementComponent({
      elementType: "span",
      text: "Items per page",
    });

    this.selectCurrentPageSpan = createElementComponent({
      elementType: "span",
      text: "Page",
    });

    this.selectCurrentPageNo = select.createSelect({
      onSelectionChanged: (e) =>
        this.onCurrentPageChange(parseInt(e.target.value)),
    });

    target.append(
      this.selectItemsPerPageSpan,
      this.selectItemsPerPage,
      this.selectCurrentPageSpan,
      this.selectCurrentPageNo,
    );
  }

  updateSelect({ currentPageNo, totalPages }) {
    updatePageSelectOptions({
      selectComponent: this.selectCurrentPageNo,
      totalPages: totalPages,
      currentPage: currentPageNo,
    });
  }
}

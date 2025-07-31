import { createElementComponent } from "../components/createElementComponentFunction";
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

  updateSelect({currentPageNo, totalPages}) {
    updateSelectOptions({
      selectComponent: this.selectCurrentPageNo,
      options: Array.from({ length: totalPages }, (_, i) => i + 1),
      currentPage: currentPageNo,
    });
  }
}

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

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    this.selectItemsPerPageSpan =
      this.createElementComponent.createSpan("Items per page");
    this.selectCurrentPageSpan = this.createElementComponent.createSpan("Page");

    this.selectItemsPerPage = this.createElementComponent.createSelect({
      options: [5, 10],
      eventToAdd: (e) => this.onItemsPerPageChange(parseInt(e.target.value)),
    });

    this.selectCurrentPageNo = this.createElementComponent.createSelect({
      eventToAdd: (e) => this.onCurrentPageChange(parseInt(e.target.value)),
    });

    this.container.append(
      this.selectItemsPerPageSpan,
      this.selectItemsPerPage,
      this.selectCurrentPageSpan,
      this.selectCurrentPageNo,
    );

    this.target = document.getElementById(containerId);
    this.target.appendChild(this.container);
  }

  updateSelect(currentPageNo, totalPages) {
    updateSelectOptions(
      this.selectCurrentPageNo,
      Array.from({ length: totalPages }, (_, i) => i + 1),
      currentPageNo
    );
  }

  // renderPaginationResults({ totalPages, currentPageNo, result, renderFunction }) {

  // this.previousBtn = this.createElementComponent.createButton({
  //   text: "Previous",
  //   eventToAdd: () => this.onPrevious?.(),
  // });
  // this.nextBtn = this.createElementComponent.createButton({
  //   text: "Next",
  //   eventToAdd: () => this.onNext?.(),
  // });
  // just put these here, they belong somwhere else
  //   renderFunction(result)
  //   this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
  //   this.previousBtn.disabled = currentPageNo <= 1;
  //   this.nextBtn.disabled = currentPageNo >= totalPages;
  // }
}

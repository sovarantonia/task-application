import { CreateElementComponent } from "../components/CreateElementComponent";

//** This renders the items per page and current page select */
export class PagerComponentUI {
  constructor({
    onItemsPerPageChange = null,
    onCurrentPageChange = null,
  } = {}) {
    this.onItemsPerPageChange = onItemsPerPageChange;
    this.onCurrentPageChange = onCurrentPageChange;

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    this.selectItemsPerPageSpan =
      this.createElementComponent.createSpan("Items per page");
    this.selectCurrentPageSpan =
      this.createElementComponent.createSpan("Page");

    this.selectItemsPerPage = this.createElementComponent.createSelect({
      options: [5, 10],
      eventToAdd: (e) => this.onItemsPerPageChange(parseInt(e.target.value)),
    });

    this.selectCurrentPageNo = this.createElementComponent.createSelect({
      eventToAdd: (e) => this.onCurrentPageChange(parseInt(e.target.value)),
    });

    this.container.append(
      this.selectItemsPerPageSpan, this.selectItemsPerPage, this.selectCurrentPageSpan,
      this.selectCurrentPageNo,
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

  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
  }
}

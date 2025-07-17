import { CreateElementComponent } from "./CreateElementComponent";

export class PagerComponent {
  constructor({ onNext, onPrev, selectOptions } = {}) {
    this.onNext = onNext;
    this.onPrevious = onPrev;

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    this.previousBtn = this.createElementComponent.createButton({
      text: "Previous",
      eventToAdd: () => this.onPrevious?.(),
    });
    this.nextBtn = this.createElementComponent.createButton({
      text: "Next",
      eventToAdd: () => this.onNext?.(),
    });

    this.paginationData = { currentPage: 1, itemsPerPage: 5 };
    // this.selectItemsPerPage = this.createElementComponent.createSelect({
    //   options: selectOptions,
    //   eventToAdd: (e) => {
    //     this.paginationData.itemsPerPage = e.target.value;
    //   },
    // });
    this.pageIndicator = this.createElementComponent.createSpan();

    this.container.append(this.previousBtn, this.pageIndicator, this.nextBtn);
  }

  setItemsPerPage = (itemNrPerPage) => {
    this.paginationData.itemsPerPage = parseInt(itemNrPerPage);
    this.paginationData.currentPage = 1;
  };

  renderPaginationResults({ totalPages, currentPage, result, renderFunction }) {
    renderFunction(result)
    this.pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    this.previousBtn.disabled = currentPage <= 1;
    this.nextBtn.disabled = currentPage >= totalPages;
  }

  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
  }
}

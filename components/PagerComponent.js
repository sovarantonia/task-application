import { CreateElementComponent } from "./CreateElementComponent";

export class PagerComponent {
  constructor({ selectOptions, onPageChange } = {}) {
    // this.onNext = onNext;
    // this.onPrevious = onPrev;

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    // this.previousBtn = this.createElementComponent.createButton({
    //   text: "Previous",
    //   eventToAdd: () => this.onPrevious?.(),
    // });
    // this.nextBtn = this.createElementComponent.createButton({
    //   text: "Next",
    //   eventToAdd: () => this.onNext?.(),
    // });

    this.selectItemsPerPage = this.createElementComponent.createSelect({
      options: selectOptions,
      eventToAdd: (e) => onPageChange?.(e.target.value) // need to do something with this value and define this function somehow
    });

    this.container.append(this.selectItemsPerPage);
  }

  // setItemsPerPage = (itemNrPerPage) => {
  //   this.paginationData.itemsPerPage = parseInt(itemNrPerPage);
  //   this.paginationData.currentPage = 1;
  // };

  // renderPaginationResults({ totalPages, currentPage, result, renderFunction }) {
  //   renderFunction(result)
  //   this.pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  //   this.previousBtn.disabled = currentPage <= 1;
  //   this.nextBtn.disabled = currentPage >= totalPages;
  // }

  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
  }
}

export class PaginationHandler {
  constructor({ paginationFunction = null, pagerComponent = null, renderFunction = null } = {}) {
    this.paginationFunction = paginationFunction;
    this.pagerComponent = pagerComponent;
    this.renderFunction = renderFunction;

    this.pagerComponent.onNext = this.onNext;
    this.pagerComponent.onPrevious = this.onPrevious;

    this.paginationData = this.pagerComponent.paginationData;
  }

  getItems() {
    //call the pagination function and pass the results to pager component
    this.paginationFunction(this.paginationData).then(
      ({ paginatedItems, totalPages }) => {
        this.totalPages = totalPages;
        this.pagerComponent.renderPaginationResults({
          totalPages: this.totalPages,
          currentPage: this.paginationData.currentPage,
          result: paginatedItems,
          renderFunction: this.renderFunction,
        });
      },
    );
  }

  onNext = () => {
    if (this.paginationData.currentPage < this.totalPages) {
      this.paginationData.currentPage++;
    }
    this.getItems();
  };

  onPrevious = () => {
    if (this.paginationData.currentPage > 1) {
      this.paginationData.currentPage--;
    }
    this.getItems();
  };
}

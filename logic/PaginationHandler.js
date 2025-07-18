import { PagerData } from "./PagerData";

export class PaginationHandler {
  constructor({ paginationFunction = null, onPaginationResponse = null } = {}) {
    this.paginationFunction = paginationFunction;
    this.onPaginationResponse = onPaginationResponse;
    // this.pagerComponent.onNext = this.onNext;
    // this.pagerComponent.onPrevious = this.onPrevious;

    this.paginationData = new PagerData();
  }

  //call the pagination function
  getItems() {
    const { currentPage, itemsPerPage } = this.paginationData;
    this.paginationFunction({
      currentPage,
      itemsPerPage,
    }).then(({ paginatedItems, totalPages }) => {
      this.onPaginationResponse({ paginatedItems, totalPages });
    });
  }

  onNext = () => {
    //have to use pager data somehow
    if (this.paginationData.currentPageNo < this.totalPages) {
      this.paginationData.currentPageNo++;
    }
    this.getItems();
  };

  onPrevious = () => {
    if (this.paginationData.currentPageNo > 1) {
      this.paginationData.currentPageNo--;
    }
    this.getItems();
  };
}

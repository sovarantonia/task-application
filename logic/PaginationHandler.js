export class PaginationHandler {
  constructor({ paginationFunction = null, onPaginationResponse = null, pagerData = null, } = {}) {
    this.paginationFunction = paginationFunction;
    this.onPaginationResponse = onPaginationResponse;
    // this.pagerComponent.onNext = this.onNext;
    // this.pagerComponent.onPrevious = this.onPrevious;

    this.pagerData = pagerData;
  }

  //call the pagination function
  getItems = ()  => {
    const { currentPageNo, itemsPerPage } = this.pagerData;
    this.paginationFunction({
      currentPageNo,
      itemsPerPage,
    }).then(({ paginatedItems, totalPages }) => {
      this.onPaginationResponse({ paginatedItems, totalPages });
    });
  }

  onNext = () => {
    //have to use pager data somehow
    if (this.pagerData.currentPageNo < this.totalPages) {
      this.pagerData.currentPageNo++;
    }
    this.getItems();
  };

  onPrevious = () => {
    if (this.pagerData.currentPageNo > 1) {
      this.pagerData.currentPageNo--;
    }
    this.getItems();
  };

}

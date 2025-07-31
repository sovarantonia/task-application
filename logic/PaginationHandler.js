export class PaginationHandler {
  constructor({
    paginationFunction = null,
    onPaginationResponse = null,
    pagerData = null,
  } = {}) {
    this.paginationFunction = paginationFunction;
    this.onPaginationResponse = onPaginationResponse;
    // this.pagerComponent.onNext = this.onNext;
    // this.pagerComponent.onPrevious = this.onPrevious;

    this.pagerData = pagerData;
    this.currentPageNo = this.pagerData.currentPageNo;
    this.itemsPerPage = this.pagerData.itemsPerPage;
    this.pagerData.onPagerDataChanged = this.getPaginatedItems;
  }

  //calls the pagination function and passes the result to pagination response
  getPaginatedItems = () => {
    const { currentPageNo, itemsPerPage } = this.pagerData;
    this.paginationFunction({
      currentPageNo: currentPageNo,
      itemsPerPage: itemsPerPage,
      sortCriteria: this.sortCriteria,
      filterCriteria: this.filterCriteria,
    }).then(({ paginatedItems, totalPages }) => {
      this.onPaginationResponse({
        paginatedItems,
        totalPages,
        currentPageNo,
        itemsPerPage,
      });
    });
  };

  onSortCriteriaChanged = (sortCriteria) => {
    this.sortCriteria = sortCriteria;
    this.getPaginatedItems();
  };

  onFilterCriteriaChanged = (filterCriteria) => {
    this.filterCriteria = filterCriteria;
    this.getPaginatedItems();
  };

  // onNext = () => {
  //   //have to use pager data somehow
  //   if (this.pagerData.currentPageNo < this.totalPages) {
  //     this.pagerData.currentPageNo++;
  //   }
  //   this.getItems();
  // };

  // onPrevious = () => {
  //   if (this.pagerData.currentPageNo > 1) {
  //     this.pagerData.currentPageNo--;
  //   }
  //   this.getItems();
  // };
}

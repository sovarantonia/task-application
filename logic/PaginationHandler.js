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
    this.pagerData.onPagerDataChanged = () => this.getItems(this.pagerData);
  }

  //calls the pagination function and passes the result to pagination response
  getItems = ({ currentPageNo, itemsPerPage }) => {
    this.paginationFunction({
      currentPageNo,
      itemsPerPage,
    }, this.sortCriteria, this.filterCriteria).then(({ paginatedItems, totalPages }) => {
      this.onPaginationResponse({ paginatedItems, totalPages });
    });
  };

  onSortCriteriaChanged = (sortCriteria) => {
    this.sortCriteria = sortCriteria
    this.getItems(this.pagerData, this.sortCriteria, this.filterCriteria);
  };

  onFilterCriteriaChanged = (filterCriteria) => {
    this.filterCriteria = filterCriteria;
    this.getItems(this.pagerData, this.sortCriteria, this.filterCriteria)
  }

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

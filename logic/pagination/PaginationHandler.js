import { loaderUtils } from "../../ui/loader.js";

export class PaginationHandler {
  constructor({
    paginationFunction = null,
    onPaginationResponse = null,
    pagerData = null,
  } = {}) {
    this.paginationFunction = paginationFunction;
    this.onPaginationResponse = onPaginationResponse;

    this.pagerData = pagerData;
    this.pagerData.onPagerDataChanged = this.getPaginatedItems;
  }

  //calls the pagination function and passes the result to pagination response
  getPaginatedItems = () => {
    loaderUtils.addLoader();

    const { currentPageNo, itemsPerPage } = this.pagerData;
    this.paginationFunction({
      currentPageNo: currentPageNo,
      itemsPerPage: itemsPerPage,
      sortCriteria: this.sortCriteria,
      filterCriteria: this.filterCriteria,
    }).then(({ paginatedItems, totalPages }) => {
      loaderUtils.hideLoader();

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
}

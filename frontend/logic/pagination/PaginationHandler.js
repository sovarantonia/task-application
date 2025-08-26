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

    this.sortCriteria = [];
    this.filterCriteria = [];
  }

  //calls the pagination function and passes the result to pagination response
  getPaginatedItems = () => {
    loaderUtils.addLoader();

    const { currentPageNo, itemsPerPage } = this.pagerData;
    return this.paginationFunction({
      currentPageNo: currentPageNo,
      itemsPerPage: itemsPerPage,
      sortCriteria: this.sortCriteria,
      filterCriteria: this.filterCriteria,
    })
    // .then(response => {
    //   loaderUtils.hideLoader();
    //   if (!response.ok) {
    //     return response.text().then((text) => {
    //         throw new Error("Error " + response.status + " " + text);
    //     })
        
    //   }
    //   return response.json();
    // })
    .then(( {paginatedItems, totalPages}) => {
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
    return this.getPaginatedItems();
  };

  onFilterCriteriaChanged = (filterCriteria) => {
    this.filterCriteria = filterCriteria;
    return this.getPaginatedItems();
  };
}

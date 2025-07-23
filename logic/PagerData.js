export class PagerData {
  constructor(onPagerDataChanged = null) {
    this.currentPageNo = 1;
    this.itemsPerPage = 5;

    this.onPagerDataChanged = onPagerDataChanged;
  }

  setItemsPerPage = (itemsPerPageNr) => {
    this.itemsPerPage = itemsPerPageNr;
    this.currentPageNo = 1;
    this.onPagerDataChanged({
      currentPageNo: this.currentPageNo,
      itemsPerPageNo: this.itemsPerPage,
    });
  };

  setCurrentPageNo = (newPageNo) => {
    this.currentPageNo = newPageNo;
    this.onPagerDataChanged({
      currentPageNo: this.currentPageNo,
      itemsPerPageNo: this.itemsPerPage,
    });
  };

  init() {
    this.onPagerDataChanged({
      currentPageNo: this.currentPageNo,
      itemsPerPageNo: this.itemsPerPage,
    });
  }
}

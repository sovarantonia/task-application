export class PagerData {
  constructor(onPagerDataChanged = null) {
    this.currentPageNo = 1;
    this.itemsPerPage = 5;

    this.onPagerDataChanged = onPagerDataChanged;
  }

  setItemsPerPage = (itemsPerPageNr) => {
    this.itemsPerPage = itemsPerPageNr;
    this.currentPageNo = 1;
    this.onPagerDataChanged();
  };

  setCurrentPageNo = (newPageNo) => {
    this.currentPageNo = newPageNo;
    this.onPagerDataChanged();
  };

  init() {
    this.onPagerDataChanged();
  }
}

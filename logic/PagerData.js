export class PagerData {
  constructor(onPagerDataChanged = null) {
    this.currentPageNo = 1;
    this.itemsPerPage = 5;

    this.onPagerDataChanged = onPagerDataChanged;
  }

  setItemsPerPage = (itemsPerPageNr) => {
    this.itemsPerPage = itemsPerPageNr;
    this.currentPageNo = 1;
    // console.log(
    //   `Pager data in SET ITEMS PER page response page nr ${this.currentPageNo} + and items per page ${this.itemsPerPage}`,
    // );
    // debugger;
    this.onPagerDataChanged({
      currentPageNo: this.currentPageNo,
      itemsPerPageNo: this.itemsPerPage,
    });
  };

  setCurrentPageNo = (newPageNo) => {
    this.currentPageNo = newPageNo;
    // console.log(
    //   `Pager data in SET CURRENT pageNo response page nr ${this.currentPageNo} + and items per page ${this.itemsPerPage}`,
    // );
    // debugger;
    this.onPagerDataChanged({
      currentPageNo: this.currentPageNo,
      itemsPerPageNo: this.itemsPerPage,
    });
  };

  init() {
    // console.log(
    //   `Pager data in INIT page nr ${this.currentPageNo} + and items per page ${this.itemsPerPage}`,
    // );
    // debugger;
    this.onPagerDataChanged({
      currentPageNo: this.currentPageNo,
      itemsPerPageNo: this.itemsPerPage,
    });
  }
}

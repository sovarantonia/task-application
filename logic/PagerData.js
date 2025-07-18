export class PagerData {
  constructor() {
    this.currentPageNo = 1;
    this.itemsPerPage = 5;
  }

  setItemsPerPage(itemsPerPageNr) {
    this.itemsPerPage = itemsPerPageNr;
  }
}

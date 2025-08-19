import { PagerData } from "../../../logic/pagination/PagerData.js";
describe("Testing pager data", () => {
  let pagerData;
  let onPagerDataChanged;

  beforeEach(() => {
    onPagerDataChanged = jasmine
      .createSpy("onPagerDataChanged")
      .and.callFake(() => {
        console.log("Pager data changed");
      });
    pagerData = new PagerData({ onPagerDataChanged });
  });

  it("Changing items per page", () => {
    pagerData.setItemsPerPage(10);
    expect(onPagerDataChanged).toHaveBeenCalled();
    expect(pagerData.currentPageNo).toBe(1);
    expect(pagerData.itemsPerPage).toBe(10);
  })

  it("Changing currentPage no", () => {
    pagerData.setCurrentPageNo(3);
    expect(onPagerDataChanged).toHaveBeenCalled();
    expect(pagerData.currentPageNo).toBe(3);
  })
});

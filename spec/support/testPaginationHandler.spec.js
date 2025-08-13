import { PaginationHandler } from "../../logic/pagination/PaginationHandler.js";
import { loaderUtils } from "../../ui/loader.js";

describe("Testing pagination handler", () => {
  let pagerData;
  let paginationFunction;
  let onPaginationResponse;

  let list;
  let paginationHandler;

  beforeEach(() => {
    let paginationHandler = new PaginationHandler({
      paginationFunction,
      onPaginationResponse,
      pagerData,
    });
    list = [
      { title: "Task title", description: "First description" },
      { title: "Another title", description: "Get a description" },
      { title: "Title", description: "Description" },
      { title: "New title", description: "Something new" },
      { title: "Random", description: "Very random description" },
      { title: "Task title", description: "Other description" },

      { title: "Task title", description: "First description" },
      { title: "Another title", description: "Get a description" },
      { title: "Title", description: "Description" },
      { title: "New title", description: "Something new" },
      { title: "Random", description: "Very random description" },
      { title: "Task title", description: "Other description" },
    ];

    paginationFunction = jasmine
      .createSpy("paginationFunction")
      .and.callFake(() => {
        return new Promise((resolve) => {
          resolve(list);
        });
      });
    onPaginationResponse = jasmine.createSpy("onPaginationResponse");
    pagerData = {
      currentPageNo: 1,
      itemsPerPage: 10,
    };
    spyOn(paginationHandler.pagerData, "onPagerDataChanged").and.callFake(
      () => {
        console.log("pager data");
      },
    );
    spyOn(loaderUtils, "addLoader").and.callFake(() =>
      console.log("add loader"),
    );
    spyOn(loaderUtils, "hideLoader").and.callFake(() =>
      console.log("hide loader"),
    );
  });

  it("Testing the pagination", () => {
    // spyOn(paginationHandler, "onSortCriteriaChanged").and.callFake((sortCriteria) => {
    //     sortCriteria = []
    //     paginationHandler.sortCriteria = [];
    // })

    paginationHandler.getPaginatedItems().then(() => {
      expect(paginationFunction).toHaveBeenCalledWith({
        currentPageNo: 1,
        itemsPerPage: 10,
        sortCriteria: undefined,
        filterCriteria: undefined,
      });
      expect(onPaginationResponse).toHaveBeenCalledWith([
        { title: "Task title", description: "First description" },
        { title: "Another title", description: "Get a description" },
        { title: "Title", description: "Description" },
        { title: "New title", description: "Something new" },
        { title: "Random", description: "Very random description" },
        { title: "Task title", description: "Other description" },
      ]);

      done();
    });
  });

  //   it("Testing the pagination with sort criteria", () => {});
});

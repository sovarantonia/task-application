import { multiFieldFilter } from "../../../helpers/filterHelper.js";
import { multiFieldSort } from "../../../helpers/sortHelper.js";
import { PaginationHandler } from "../../../logic/pagination/PaginationHandler.js";
import { loaderUtils } from "../../../ui/loader.js";

describe("Testing pagination handler", () => {
  let pagerData;
  let paginationFunction;
  let onPaginationResponse;

  let list;
  let paginationHandler;

  beforeEach(() => {
    list = [
      { title: "Task title", description: "First description", user: "Bob" },
      {
        title: "Another title",
        description: "Get a description",
        user: "Alice",
      },
      { title: "Title", description: "Description", user: "Bob" },
      { title: "New title", description: "Something new", user: "Alice" },
      {
        title: "Random",
        description: "Very random description",
        user: "Alice",
      },
      { title: "Task title", description: "Other description", user: "Bob" },

      { title: "Task title", description: "First description", user: "Alice" },
      { title: "Another title", description: "Get a description", user: "C" },
      { title: "Title", description: "Description", user: "C" },
      { title: "New title", description: "Something new", user: "Bob" },
      { title: "Random", description: "Very random description", user: "C" },
      { title: "Task title", description: "Other description", user: "C" },
    ];

    onPaginationResponse = jasmine.createSpy("onPaginationResponse");
    pagerData = {
      currentPageNo: 1,
      itemsPerPage: 10,
      onPagerDataChanged: null,
    };

    spyOn(loaderUtils, "addLoader").and.callFake(() =>
      console.log("add loader"),
    );
    spyOn(loaderUtils, "hideLoader").and.callFake(() =>
      console.log("hide loader"),
    );
  });

  it("Testing the pagination", (done) => {
    paginationFunction = jasmine
      .createSpy("paginationFunction")
      .and.callFake(() => {
        return new Promise((resolve) => {
          resolve({ paginatedItems: list, totalPages: 1 });
        });
      });

    const { currentPageNo, itemsPerPage } = pagerData;

    paginationHandler = new PaginationHandler({
      paginationFunction,
      onPaginationResponse,
      pagerData,
    });

    const promise = paginationHandler.getPaginatedItems();
    promise.then(() => {
      expect(paginationFunction).toHaveBeenCalledWith({
        currentPageNo,
        itemsPerPage,
        sortCriteria: undefined,
        filterCriteria: undefined,
      });
      expect(onPaginationResponse).toHaveBeenCalledWith({
        paginatedItems: list,
        totalPages: 1,
        currentPageNo: 1,
        itemsPerPage: 10,
      });
      done();
    });
  });

  it("Testing the pagination with sort criteria", (done) => {
    const sortCriteria = [
      { property: "title", direction: 1 },
      { property: "description", direction: 1 },
    ];

    const sortedList = [...list].sort(
      multiFieldSort({ criteria: sortCriteria }),
    );

    paginationFunction = jasmine
      .createSpy("paginationFunction")
      .and.callFake(() => {
        return new Promise((resolve) => {
          resolve({ paginatedItems: sortedList, totalPages: 1 });
        });
      });

    paginationHandler = new PaginationHandler({
      paginationFunction,
      onPaginationResponse,
      pagerData,
    });

    const { currentPageNo, itemsPerPage } = pagerData;

    const promise = paginationHandler.onSortCriteriaChanged(sortCriteria);

    promise.then(() => {
      expect(paginationFunction).toHaveBeenCalledWith({
        currentPageNo,
        itemsPerPage,
        sortCriteria,
        filterCriteria: undefined,
      });

      expect(onPaginationResponse).toHaveBeenCalledWith({
        paginatedItems: sortedList,
        totalPages: 1,
        currentPageNo: 1,
        itemsPerPage: 10,
      });

      done();
    });
  });

  it("Testing the pagination with filter criteria", (done) => {
    const filterCriteria = [{ property: "user", value: "Alice" }];
    const filteredList = [...list].filter(
      multiFieldFilter({ criteria: filterCriteria }),
    );

    paginationFunction = jasmine
      .createSpy("paginationFunction")
      .and.callFake(() => {
        return new Promise((resolve) => {
          resolve({ paginatedItems: filteredList, totalPages: 1 });
        });
      });

    paginationHandler = new PaginationHandler({
      paginationFunction,
      onPaginationResponse,
      pagerData,
    });

    const { currentPageNo, itemsPerPage } = pagerData;

    const promise = paginationHandler.onFilterCriteriaChanged(filterCriteria);

    promise.then(() => {
      expect(paginationFunction).toHaveBeenCalledWith({
        itemsPerPage,
        currentPageNo,
        sortCriteria: undefined,
        filterCriteria,
      });

      expect(onPaginationResponse).toHaveBeenCalledWith({
        paginatedItems: filteredList,
        totalPages: 1,
        currentPageNo: 1,
        itemsPerPage: 10,
      });

      done();
    });
  });

  it("Testing the pagination with sort and filter criteria", (done) => {
    const filterCriteria = [{ property: "user", value: "Alice" }];
    const sortCriteria = [
      { property: "title", direction: 1 },
      { property: "description", direction: 1 },
    ];

    const filteredList = [...list].filter(
      multiFieldFilter({ criteria: filterCriteria }),
    );

    const finalList = [...filteredList].sort(
      multiFieldSort({ criteria: sortCriteria }),
    );

    paginationFunction = jasmine
      .createSpy("paginationFunction")
      .and.callFake(() => {
        return new Promise((resolve) => {
          resolve({ paginatedItems: finalList, totalPages: 1 });
        });
      });

    paginationHandler = new PaginationHandler({
      paginationFunction,
      onPaginationResponse,
      pagerData,
    });

    const { currentPageNo, itemsPerPage } = pagerData;

    paginationHandler.onFilterCriteriaChanged(filterCriteria);
    const promise = paginationHandler.onSortCriteriaChanged(sortCriteria);

    promise.then(() => {
      expect(paginationFunction).toHaveBeenCalledWith({
        itemsPerPage,
        currentPageNo,
        sortCriteria,
        filterCriteria,
      });

      expect(onPaginationResponse).toHaveBeenCalledWith({
        paginatedItems: finalList,
        totalPages: 1,
        currentPageNo: 1,
        itemsPerPage: 10,
      });
      
    });
    done();
  });
});

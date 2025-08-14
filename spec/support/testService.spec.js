import { multiFieldFilter } from "../../helpers/filterHelper.js";
import { multiFieldSort } from "../../helpers/sortHelper.js";
import { DbService } from "../../service/DbService.js";

describe("Testing service functionalities", () => {
  let service;
  let list;

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
    service = new DbService(list);
  });

  const testCases = [
    { currentPageNo: 1, itemsPerPage: 6, totalPagesRes: 1 },
    { currentPageNo: 1, itemsPerPage: 12, totalPagesRes: 1 },
  ];

  testCases.forEach(({ currentPageNo, itemsPerPage, totalPagesRes }) => {
    it(`Testing the get paginated items with ${itemsPerPage} items per page and current page no ${currentPageNo}`, (done) => {
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
      const promise = service.getPaginatedItems({
        currentPageNo: currentPageNo,
        itemsPerPage: itemsPerPage,
        sortCriteria,
        filterCriteria,
      });

      promise.then(({ paginatedItems, totalPages }) => {
        expect(paginatedItems).toEqual(finalList);
        expect(totalPages).toBe(totalPagesRes);

        done();
      });
    });
  });

  it("Testing the save method", (done) => {
    const newObj = {
      title: "New Task title",
      description: "Other description new",
      user: "C",
    };

    const promise = service.save({ objToSave: newObj });

    promise.then((objToSave) => {
      expect(objToSave).toEqual(newObj);
      done();
    });
  });
});

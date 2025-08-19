import { multiFieldFilter } from "../../helpers/filterHelper.js";
import { multiFieldSort } from "../../helpers/sortHelper.js";
import { DbService } from "../../service/DbService.js";

describe("Testing service functionalities", () => {
  let service;
  let list;

  beforeEach(() => {
    list = [
      {
        id: 1,
        title: "Task title",
        description: "First description",
        user: "Bob",
      },
      {
        id: 2,
        title: "Another title",
        description: "Get a description",
        user: "Alice",
      },
      { id: 3, title: "Title", description: "Description", user: "Bob" },
      {
        id: 4,
        title: "New title",
        description: "Something new",
        user: "Alice",
      },
      {
        id: 5,
        title: "Random",
        description: "Very random description",
        user: "Alice",
      },
      {
        id: 6,
        title: "Task title",
        description: "Other description",
        user: "Bob",
      },

      {
        id: 7,
        title: "Task title",
        description: "First description",
        user: "Alice",
      },
      {
        id: 8,
        title: "Another title",
        description: "Get a description",
        user: "C",
      },
      { id: 9, title: "Title", description: "Description", user: "C" },
      { id: 10, title: "New title", description: "Something new", user: "Bob" },
      {
        id: 11,
        title: "Random",
        description: "Very random description",
        user: "C",
      },
      {
        id: 12,
        title: "Task title",
        description: "Other description",
        user: "C",
      },
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

  it("Testing the update method", (done) => {
    const updateObj = {
      id: 2,
      title: "Another title but shorter",
      description: "Get a description but longer",
      user: "Alice",
    };

    const promise = service.update({ id: updateObj.id, props: updateObj });

    promise.then((objToUpdate) => {
      expect(objToUpdate).toEqual(updateObj);
    });

    done();
  });

  it("Testing delete method", (done) => {
    const deleteObj = {
      id: 2,
      title: "Another title",
      description: "Get a description",
      user: "Alice",
    };
    const id = 2;
    const promise = service.delete(id);

    promise.then((removed) => {
        expect(removed).toEqual(deleteObj);
        expect(list.find((item) => item.id === id)).toBe(undefined);

        done();
    });
  });
});

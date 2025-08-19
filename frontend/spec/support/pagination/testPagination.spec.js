import {
  getPaginatedElements,
  getTotalPages,
} from "../../../logic/pagination/Pagination.js";

describe("Testing pagination logic", () => {
  let list = [
    { title: "Task title", description: "First description" },
    { title: "Another title", description: "Get a description" },
    { title: "Title", description: "Description" },
    { title: "New title", description: "Something new" },
    { title: "Random", description: "Very random description" },

    { title: "Task title", description: "First description" },
    { title: "Another title", description: "Get a description" },
    { title: "Title", description: "Description" },
    { title: "New title", description: "Something new" },
    { title: "Random", description: "Very random description" },

    { title: "Task title", description: "First description" },
    { title: "Another title", description: "Get a description" },
    { title: "Title", description: "Description" },
    { title: "New title", description: "Something new" },
    { title: "Random", description: "Very random description" },
  ];
  const testCasesWith5 = [
    { currentPageNo: 1, itemsPerPage: 5 },
    { currentPageNo: 2, itemsPerPage: 5 },
  ];

  const testCasesWith10 = [
    { currentPageNo: 1, itemsPerPage: 10 },
    { currentPageNo: 2, itemsPerPage: 10 },
  ];

  testCasesWith5.forEach(({ currentPageNo, itemsPerPage }) => {
    it(`Test get paginated items with ${itemsPerPage} items per page and current page ${currentPageNo}`, () => {
      const paginatedItems = getPaginatedElements({
        elementList: list,
        currentPageNo,
        itemsPerPage,
      });
      expect(paginatedItems.length).toBe(5);
      expect(paginatedItems.at(0).title).toBe("Task title");
      expect(paginatedItems.at(1).title).toBe("Another title");
      expect(paginatedItems.at(2).title).toBe("Title");
      expect(paginatedItems.at(3).title).toBe("New title");
      expect(paginatedItems.at(4).title).toBe("Random");
    });

    it(`Test get total pages with ${itemsPerPage} items per page and current page ${currentPageNo}`, () => {
      const totalPages = getTotalPages({ elementList: list, itemsPerPage });
      expect(totalPages).toBe(3);
    });
  });

  testCasesWith10.forEach(({ currentPageNo, itemsPerPage }) => {
    it(`Test get paginated items with ${itemsPerPage} items per page and current page ${currentPageNo}`, () => {
      const paginatedItems = getPaginatedElements({
        elementList: list,
        currentPageNo,
        itemsPerPage,
      });

      expect(paginatedItems.at(0).title).toBe("Task title");
      expect(paginatedItems.at(1).title).toBe("Another title");
      expect(paginatedItems.at(2).title).toBe("Title");
      expect(paginatedItems.at(3).title).toBe("New title");
      expect(paginatedItems.at(4).title).toBe("Random");

      if (paginatedItems.length > 5) {
        expect(paginatedItems.at(5).title).toBe("Task title");
        expect(paginatedItems.at(6).title).toBe("Another title");
        expect(paginatedItems.at(7).title).toBe("Title");
        expect(paginatedItems.at(8).title).toBe("New title");
        expect(paginatedItems.at(9).title).toBe("Random");
      }
    });

    it(`Test get total pages with ${itemsPerPage} items per page and current page ${currentPageNo}`, () => {
      const totalPages = getTotalPages({ elementList: list, itemsPerPage });
      expect(totalPages).toBe(2);
    });
  });
});

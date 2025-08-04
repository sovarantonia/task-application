import { multiFieldSort } from "../../helpers/sortHelper.js";

describe("Testing helpers", () => {
  describe("Sort testing", () => {
    let list;
    beforeEach(() => {
      list = [
        { title: "Task title", description: "First description" },
        { title: "Another title", description: "Get a description" },
        { title: "Title", description: "Description" },
        { title: "New title", description: "Something new" },
        { title: "Random", description: "Very random description" },
        { title: "Task title", description: "Other description" },
      ];
    });

    it("This should sort my list in ascending order, 1 criterion", () => {
      const criteria = [{ property: "title", direction: 1 }];
      list.sort(multiFieldSort({ criteria }));
      expect(list.length).toBe(6);
      expect(list.at(0).title).toBe("Another title");
      expect(list.at(1).title).toBe("New title");
      expect(list.at(2).title).toBe("Random");
      expect(list.at(3).title).toBe("Task title");
      expect(list.at(4).title).toBe("Task title");
      expect(list.at(5).title).toBe("Title");
    });

    it("This should sort my list in descending order, 1 criterion", () => {
      const criteria = [{ property: "title", direction: -1 }];
      list.sort(multiFieldSort({ criteria }));
      expect(list.length).toBe(6);
      expect(list.at(5).title).toBe("Another title");
      expect(list.at(4).title).toBe("New title");
      expect(list.at(3).title).toBe("Random");
      expect(list.at(2).title).toBe("Task title");
      expect(list.at(1).title).toBe("Task title");
      expect(list.at(0).title).toBe("Title");
    });

    it("This should not sort my list, default order", () => {
      const criteria = [{ property: "title", direction: 0 }];
      list.sort(multiFieldSort({ criteria }));
      expect(list.length).toBe(6);
      expect(list.at(0).title).toBe("Task title");
      expect(list.at(1).title).toBe("Another title");
      expect(list.at(2).title).toBe("Title");
      expect(list.at(3).title).toBe("New title");
      expect(list.at(4).title).toBe("Random");
      expect(list.at(5).title).toBe("Task title");
    });

    it("This should sort my list in asceding order using 2 criteria", () => {
      const criteria = [
        { property: "title", direction: 1 },
        { property: "description", direction: 1 },
      ];
      list.sort(multiFieldSort({criteria}))
      expect(list.at(0).title).toBe("Another title");
      expect(list.at(1).title).toBe("New title");
      expect(list.at(2).title).toBe("Random");
      expect(list.at(3).title).toBe("Task title");
      expect(list.at(4).title).toBe("Task title");
      expect(list.at(5).title).toBe("Title");

      expect(list.at(3).description).toBe("First description");
      expect(list.at(4).description).toBe("Other description");
    });
  });
});

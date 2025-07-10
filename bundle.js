(function () {
  'use strict';

  const initialTaskData = [
    {
      id: "24ab0076-1acc-41c2-952e-ca889c8c7695",
      title: "Fix login bug",
      description: "Users cannot log in with correct credentials.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      userName: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      creationDate: "2025-06-15",
    },
    {
      id: "1e0a63a7-6445-4254-8d58-9d8b19ab72e3",
      title: "Add user profile page",
      description:
        "Create a page where users can update their personal information.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      userName: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      creationDate: "2025-06-14",
    },
    {
      id: "6a274a51-94cc-4244-b0fd-cc232f61d671",
      title: "Optimize database queries",
      description:
        "Improve the performance of slow-loading pages by optimizing queries.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      userName: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      creationDate: "2025-06-12",
    },
    {
      id: "b6354a2b-2adf-4954-9fbe-61c783b89360",
      title: "Implement dark mode",
      description: "Add an option for users to toggle dark mode in settings.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      userName: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      creationDate: "2025-06-13",
    },
    {
      id: "43b82409-8234-44cf-a4b3-8dc590a6df6b",
      title: "Write integration tests for user service",
      description:
        "Ensure critical user workflows are covered by integration tests.",
      status: "b9920485-9f7e-4e82-bba6-3b761df91cb4",
      userName: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      creationDate: "2025-06-15",
    },
    {
      id: "4c20f508-a24c-41ba-97ff-e34616d2c57c",
      title: "Fix password reset issue",
      description: "Reset link fails for accounts created before 2024.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      userName: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      creationDate: "2025-06-16",
    },
    {
      id: "41634150-0e26-4f2d-a62c-abadc417eaa4",
      title: "Redesign user profile UI",
      description: "Modernize the layout of the user profile page.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      userName: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      creationDate: "2025-06-17",
    },
    {
      id: "fcbbf209-17b9-4e41-a307-71235780de6e",
      title: "Add indexing to improve search speed",
      description: "Use PostgreSQL indexing to enhance filtering by title.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      userName: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      creationDate: "2025-06-17",
    },
    {
      id: "abf36db4-4446-4404-a58e-6ca43bc1db22",
      title: "Add system-wide color theme toggle",
      description: "Support dynamic switching between themes.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      userName: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      creationDate: "2025-06-18",
    },
    {
      id: "eff52628-aae3-4357-8857-6713c56f1f7e",
      title: "Refactor test suite structure",
      description: "Organize unit and integration tests into separate folders.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      userName: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      creationDate: "2025-06-18",
    },
    {
      id: "35f172b6-b462-4d37-91c2-91d3938321c2",
      title: "Fix login redirect bug",
      description: "Users stay on login page even after successful login.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      userName: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      creationDate: "2025-06-10",
    },
    {
      id: "5acef95d-1971-45cd-ae8f-c789cb256807",
      title: "Add avatar upload on profile page",
      description: "Users can upload and crop their profile picture.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      userName: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      creationDate: "2025-06-19",
    },
    {
      id: "563a2664-bf68-43d7-9b3d-3899bf24bd08",
      title: "Clean up deprecated SQL queries",
      description: "Remove old joins and improve query structure.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      userName: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      creationDate: "2025-06-09",
    },
    {
      id: "95a896da-f3be-4f92-b60e-c5c390e1e4c4",
      title: "Improve dark mode contrast",
      description: "Adjust color palette for better accessibility in dark mode.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      userName: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      creationDate: "2025-06-20",
    },
    {
      id: "118763b8-6d69-4a7c-901e-c41fd97f1fde",
      title: "Test PDF export functionality",
      description: "Validate correctness of downloaded PDFs for shared notes.",
      status: "b9920485-9f7e-4e82-bba6-3b761df91cb4",
      userName: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      creationDate: "2025-06-20",
    },
    {
      id: "f98e4427-0c0c-4d83-9f00-1866f9683a47",
      title: "Fix session timeout bug",
      description: "Auto logout occurs prematurely after login.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      userName: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      creationDate: "2025-06-21",
    },
    {
      id: "01734573-74cf-41e7-84e4-e0635529fbea",
      title: "Add contact information section",
      description: "Enable users to save multiple contact details.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      userName: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      creationDate: "2025-06-21",
    },
    {
      id: "b0c420d1-21d1-4431-a8af-0b43cf8732ef",
      title: "Analyze DB performance metrics",
      description: "Generate weekly reports on slow queries and memory usage.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      userName: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      creationDate: "2025-06-11",
    },
    {
      id: "25c76bc3-177e-4bc9-834a-5d15dfdde382",
      title: "Add auto dark mode using system preference",
      description: "Use media query to detect and apply user's OS theme.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      userName: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      creationDate: "2025-06-22",
    },
    {
      id: "5ad61f51-d697-43b4-afad-e88538399827",
      title: "Expand test coverage for PDF module",
      description: "Cover edge cases and error handling in export logic.",
      status: "b9920485-9f7e-4e82-bba6-3b761df91cb4",
      userName: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      creationDate: "2025-06-22",
    },
  ];

  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  class TaskService {
    constructor(dbService) {
      this.service = dbService;
    }

    saveTask(newTask) {
      const id = generateGUID();
      newTask.id = id;
      return this.service.save(newTask);
    }

    getAllTasks() {
      return this.service.getAll();
    }

    getTaskById(id) {
      return this.service.findById(id);
    }

    updateTask(task) {
      const { id, ...props } = task;
      return this.service.update(id, props);
    }

    getTasks({ currentPage, itemsPerPage }, sortCriteria = [], filterCriteria = []) {
      return this.service.getPaginatedItems({ currentPage, itemsPerPage }, sortCriteria, filterCriteria);
    }

    getTotalPages(itemsPerPage) {
      return this.service.getTotalPages(itemsPerPage);
    }

  }

  function getPaginatedElements(
    elementList,
    { currentPage, itemsPerPage },
  ) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return elementList.slice(start, end);
  }

  function getTotalPages(elementList, itemsPerPage) {
    return Math.ceil(elementList.length / itemsPerPage);
  }

  function combineComparisonFunctions(compareFunctions) {
    return (a, b) => {
      for (const compareFunction of compareFunctions) {
        const result = compareFunction(a, b);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    };
  }

  function multiFieldSort(criteria) {
    const compareFunctions = criteria.map(({ property, direction }) => {
      return (a, b) => {
        if (a[property] === b[property]) return 0;
        return a[property] < b[property] ? -direction : direction;
      };
    });

    return combineComparisonFunctions(compareFunctions);
  }

  function multiFieldFilter(criteria) {
    const filterFunctions = criteria.map(({ property, value }) => {
      return (item) => item[property] === value;
    });

    return combineFilterComparisonFunctions(filterFunctions);
  }

  function combineFilterComparisonFunctions(functions) {
    return (item) => {
      return functions.every((f) => f(item));
    };
  }

  class DbService {
    constructor(initialData) {
      this.objectList = initialData;
    }

    save(objToSave) {
      return new Promise((resolve) => {
        this.objectList.push(objToSave);
        resolve(objToSave);
      });
    }

    update(id, props) {
      return new Promise((resolve, reject) => {
        const objToFind = this.objectList.find((obj) => obj.id === id);
        if (!objToFind) {
          return reject(`Object with id ${id} not found`);
        }

        Object.assign(objToFind, props);
        resolve(objToFind);
      });
    }

    delete(id) {
      return new Promise((resolve, reject) => {
        const index = this.objectList.findIndex((o) => o.id === id);
        if (index !== -1) {
          const removed = this.objectList.splice(index, 1)[0];
          resolve(removed);
        } else {
          reject(`Object with id ${id} not found`);
        }
      });
    }

    findById(objId) {
      return new Promise((resolve, reject) => {
        const objToFind = this.objectList.find((obj) => obj.id === objId);
        if (objToFind !== undefined) {
          resolve(objToFind);
        } else {
          reject(`Object with id ${objId} not found`);
        }
      });
    }

    getAll() {
      return new Promise((resolve) => {
        resolve(this.objectList);
      });
    }

    getPaginatedItems(
      { currentPage, itemsPerPage },
      sortCriteria = [],
      filterCriteria = [],
    ) {
      return new Promise((resolve) => {
        let items = [...this.objectList];

        if (filterCriteria.length > 0) {
          items = items.filter(multiFieldFilter(filterCriteria));
        }

        if (sortCriteria.length > 0) {
          items = items.sort(multiFieldSort(sortCriteria));
        }
        
        const paginatedItems = getPaginatedElements(items, {
          currentPage,
          itemsPerPage,
        });
        const totalPages = getTotalPages(items, itemsPerPage);

        resolve({ paginatedItems, totalPages });
      });
    }

    getTotalPages(itemsPerPage) {
      return new Promise((resolve) => {
        resolve(getTotalPages(this.objectList, itemsPerPage));
      });
    }
  }

  class TaskPage {
    constructor(taskService) {
      this.taskService = taskService;

      this.container = document.getElementById("taskContainer");
      this.select = document.getElementById("itemsPerPageSelect");

      this.previousBtn = document.getElementById("previousBtn");
      this.nextBtn = document.getElementById("nextBtn");
      this.currentPageSpan = document.getElementById("currentPageSpan");
      this.firstPageBtn = document.getElementById("firstPageBtn");
      this.lastPageBtn = document.getElementById("lastPageBtn");

      this.currentPage = 1;
      this.itemsPerPage = parseInt(this.select.value);
      this.taskService.getTotalPages(this.itemsPerPage).then((total) => {
        this.totalPages = total;
        this.lastPageBtn.innerText = total.toString();
      });

      this.sortingCriteria = [];
      this.filterCriteria = [];
    }

    init() {
      this.attachEvents();
      this.renderPage();
      this.renderPaginationControls();
    }

    attachEvents() {
      this.select.addEventListener("change", (e) => {
        this.itemsPerPage = parseInt(e.target.value);
        this.currentPage = 1;
        this.currentPageSpan.innerText = this.currentPage.toString();

        this.taskService.getTotalPages(this.itemsPerPage).then((total) => {
          this.totalPages = total;
          this.lastPageBtn.innerText = total.toString();
          this.renderPage();
          this.renderPaginationControls();
        });
      });

      this.previousBtn.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
        this.currentPageSpan.innerText = this.currentPage.toString();
        this.renderPage();
        this.renderPaginationControls();
      });

      this.nextBtn.addEventListener("click", () => {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }

        this.currentPageSpan.innerText = this.currentPage.toString();
        this.renderPage();
        this.renderPaginationControls();
      });

      this.firstPageBtn.addEventListener("click", () => {
        this.currentPage = 1;
        this.renderPage();
        this.renderPaginationControls();
      });

      this.lastPageBtn.addEventListener("click", () => {
        this.currentPage = this.totalPages;
        this.renderPage();
        this.renderPaginationControls();
      });

    }

    renderPage() {
      this.container.innerHTML = "";
      this.taskService
        .getTasks(
          { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage },
          this.sortingCriteria,
          this.filterCriteria,
        )
        .then(({ paginatedItems, totalPages }) => {
          this.totalPages = totalPages;
          this.lastPageBtn.innerText = this.totalPages;

          paginatedItems.forEach((element) => {
            const card = document.createElement("div");
            card.className = "task-card";
            card.innerHTML = `<h2>${element.title}</h2>
          <p>Status: ${element.status}</p>
          <p>${element.description}</p>
          <p>Assigned to: ${element.userName}</p>
          <p>Created at: ${element.creationDate}</p>`;
            this.container.appendChild(card);
          });

          this.currentPageSpan.innerText = this.currentPage.toString();
          this.renderPaginationControls();
        });
    }

    renderPaginationControls() {
      this.lastPageBtn.hidden =
        this.firstPageBtn.innerText === this.lastPageBtn.innerText &&
        this.lastPageBtn.innerText === "1";
      this.previousBtn.disabled = this.currentPage === 1;
      this.nextBtn.disabled = this.currentPage === this.totalPages;
      this.currentPageSpan.hidden =
        this.currentPage === 1 || this.currentPage === this.totalPages;
    }
  }

  function dateParser(value) {
    return new Date(value);
  }

  class SortTasksControl {
    constructor(sortingCriteria, renderPageFunction) {
      this.titleSortBtn = document.getElementById("titleSortBtn");
      this.dateSortBtn = document.getElementById("dateSortBtn");

      this.sortingCriteria = sortingCriteria;
      this.renderPage = renderPageFunction;
    }

    addEvents() {
      this.titleSortBtn.addEventListener("click", () => {
        const titleArrow = document.getElementById("titleArrow");
        let sortingDirection = 0;
        let clickNr = parseInt(this.titleSortBtn.dataset.sortTitleState);
        clickNr = (clickNr + 1) % 3;
        this.titleSortBtn.dataset.sortTitleState = clickNr;

        if (clickNr === 1) {
          sortingDirection = 1;
          titleArrow.textContent = "\u2191";
        } else if (clickNr == 2) {
          sortingDirection = -1;
          titleArrow.textContent = "\u2193";
        } else {
          sortingDirection = 0;
          titleArrow.textContent = "";
        }

        const titleSortOption = {
          property: "title",
          direction: sortingDirection,
        };
        const elementIndex = this.sortingCriteria.findIndex(
          (e) => e.property === "title",
        );
        if (elementIndex === -1) {
          if (titleSortOption.direction !== 0) {
            this.sortingCriteria.push(titleSortOption);
          }
        } else {
          if (titleSortOption.direction === 0) {
            this.sortingCriteria.splice(elementIndex, 1);
          } else {
            this.sortingCriteria[elementIndex] = titleSortOption;
          }
        }

        this.renderPage();
      });

      this.dateSortBtn.addEventListener("click", () => {
        const dateArrow = document.getElementById("dateArrow");
        let sortingDirection = 0;
        let clickNr = parseInt(this.dateSortBtn.dataset.sortDateState);
        clickNr = (clickNr + 1) % 3;
        this.dateSortBtn.dataset.sortDateState = clickNr;

        if (clickNr === 1) {
          sortingDirection = 1;
          dateArrow.textContent = "\u2191";
        } else if (clickNr == 2) {
          sortingDirection = -1;
          dateArrow.textContent = "\u2193";
        } else {
          sortingDirection = 0;
          dateArrow.textContent = "";
        }

        const dateSortOption = {
          property: "creationDate",
          direction: sortingDirection,
        };
        const elementIndex = this.sortingCriteria.findIndex(
          (e) => e.property === "creationDate",
        );
        if (elementIndex === -1) {
          if (dateSortOption.direction !== 0) {
            this.sortingCriteria.push(dateSortOption);
          }
        } else {
          if (dateSortOption.direction === 0) {
            this.sortingCriteria.splice(elementIndex, 1);
          } else {
            this.sortingCriteria[elementIndex] = dateSortOption;
          }
        }

        this.renderPage();
      });
    }
  }

  const initialUserData = [
    { id: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67", userName: "Alice Morgan" },
    { id: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624", userName: "Bob Daniels" },
    { id: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d", userName: "Charlie Wu" },
    { id: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721", userName: "Dana Kim" },
    { id: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba", userName: "Eva Thompson" },
    { id: "4f2fd22d-74cc-40bb-9600-2e9e83f223db", userName: "Frank Ortega" },
    { id: "8ea1de6b-681b-4d47-a4f7-abc9c7e19e02", userName: "Grace Lee" },
    { id: "f8c2f610-08c3-42f6-bbde-f94fc53119ea", userName: "Henry Patel" },
    { id: "bd23c62f-205b-44aa-8b63-d0bfb749d4b9", userName: "Isla Novak" },
    { id: "3e4a3c5f-f6c7-442b-8c17-ccdd75ef1b7e", userName: "Jack Reynolds" },
  ];

  const TaskStatus = [
    { id: "ad06176e-88cd-4eee-90b5-44fcea585434", status: "To Do" },
    { id: "44d21520-d383-4bc3-b6db-848f3545df56", status: "In Progress" },
    { id: "b9920485-9f7e-4e82-bba6-3b761df91cb4", status: "In Review" },
    { id: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79", status: "Done" },
  ];

  class FilterTasksControl {
    constructor(filterCriteria, renderPageFunction) {
      this.statusFilterSelect = document.getElementById("statusFilterSelect");
      this.userFilterSelect = document.getElementById("userFilterSelect");

      this.filterCriteria = filterCriteria;
      this.renderPage = renderPageFunction;
    }

    init() {
      this.populateSelect();
      this.addEvents();
    }

    populateSelect() {
      this.userFilterSelect.innerHTML = "";
      const allUserOption = document.createElement("option");
      allUserOption.value = allUserOption.text = "All";
      this.userFilterSelect.add(allUserOption);

      initialUserData.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.text = user.userName;
        this.userFilterSelect.add(option);
      });

      const allStatusOption = document.createElement("option");
      allStatusOption.value = allStatusOption.text = "All";

      this.statusFilterSelect.innerHTML = "";
      this.statusFilterSelect.add(allStatusOption);

      TaskStatus.forEach((taskStatus) => {
        const option = document.createElement("option");
        option.value = taskStatus.id;
        option.text = taskStatus.status;
        this.statusFilterSelect.add(option);
      });
    }

    addEvents() {
      this.statusFilterSelect.addEventListener("change", (e) => {
        const statusFilterOption = {
          property: "status",
          value: e.target.value,
        };
        const elementIndex = this.filterCriteria.findIndex(
          (option) => option.property === "status",
        );
        if (elementIndex === -1) {
          if (e.target.value !== "All") {
            this.filterCriteria.push(statusFilterOption);
          }
        } else {
          if (e.target.value !== "All") {
            this.filterCriteria[elementIndex] = statusFilterOption;
          } else {
            this.filterCriteria.splice(elementIndex, 1);
          }
        }

        this.renderPage();
      });

      this.userFilterSelect.addEventListener("change", (e) => {
        const userFilterOption = {
          property: "userName",
          value: e.target.value,
        };
        const elementIndex = this.filterCriteria.findIndex(
          (option) => option.property === "userName",
        );
        if (elementIndex === -1) {
          if (e.target.value !== "All") {
            this.filterCriteria.push(userFilterOption);
          }
        } else {
          if (e.target.value !== "All") {
            this.filterCriteria[elementIndex] = userFilterOption;
          } else {
            this.filterCriteria.splice(elementIndex, 1);
          }
        }

        this.renderPage();
      });
    }
  }

  class TaskPresentationService {
    constructor() {
      initialTaskData.forEach((task) => {
        dateParser(task.creationDate);
      });
      this.dbService = new DbService(initialTaskData);
      this.taskService = new TaskService(this.dbService);

      this.taskPage = new TaskPage(this.taskService);
      this.sortTasksControl = new SortTasksControl(this.taskPage.sortingCriteria, this.taskPage.renderPage.bind(this.taskPage));
      this.filterTasksControl = new FilterTasksControl(this.taskPage.filterCriteria, this.taskPage.renderPage.bind(this.taskPage));
    }

    init() {
      this.taskPage.init();
      this.sortTasksControl.addEvents();
      this.filterTasksControl.init();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const taskPresentationService = new TaskPresentationService();
    taskPresentationService.init();
  });

})();

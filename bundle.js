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

  class CreateElementComponent {
    createDiv() {
      return document.createElement("div");
    }
    createButton({ text = "", eventToAdd = null } = {}) {
      const button = document.createElement("button");
      button.textContent = text;
      button.addEventListener("click", eventToAdd);
      return button;
    }

    createSpan(text = "") {
      const span = document.createElement("span");
      span.textContent = text;
      return span;
    }

    createCheckbox({ value = "", eventToAdd = null } = {}) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = value;
      checkbox.addEventListener("change", eventToAdd);
      return checkbox;
    }

    createP(text = "") {
      const p = document.createElement("p");
      p.innerText = text;
      return p;
    }

    createSelect({ options = [], eventToAdd = null } = {}) {
      const select = document.createElement("select");
      if (options.length > 0) {
        options.forEach((element) => {
          const opt = document.createElement("option");
          opt.value = element;
          opt.textContent = element;
          select.append(opt);
        });
        select.options[0].selected = true;
      }
      select.addEventListener("change", eventToAdd);
      return select;
    }
  }

  function updateSelectOptions(
    selectComponent,
    options = [],
    currentPage,
  ) {
    let optionNo = selectComponent.options.length - 1;
    if (optionNo > 0) {
      for (let i = optionNo; i >= 0; i--) {
        selectComponent.remove(i);
      }
    }

    options.forEach((element) => {
      const opt = document.createElement("option");
      opt.value = element;
      opt.textContent = element;
      selectComponent.append(opt);
    });

    selectComponent.options[currentPage - 1].selected = true;
  }

  //** This renders the items per page and current page select */
  class PagerComponentUI {
    constructor({
      onItemsPerPageChange = null,
      onCurrentPageChange = null,
      containerId,
    } = {}) {
      this.onItemsPerPageChange = onItemsPerPageChange;
      this.onCurrentPageChange = onCurrentPageChange;

      this.createElementComponent = new CreateElementComponent();
      this.container = this.createElementComponent.createDiv();

      this.selectItemsPerPageSpan =
        this.createElementComponent.createSpan("Items per page");
      this.selectCurrentPageSpan = this.createElementComponent.createSpan("Page");

      this.selectItemsPerPage = this.createElementComponent.createSelect({
        options: [5, 10],
        eventToAdd: (e) => this.onItemsPerPageChange(parseInt(e.target.value)),
      });

      this.selectCurrentPageNo = this.createElementComponent.createSelect({
        eventToAdd: (e) => this.onCurrentPageChange(parseInt(e.target.value)),
      });

      this.container.append(
        this.selectItemsPerPageSpan,
        this.selectItemsPerPage,
        this.selectCurrentPageSpan,
        this.selectCurrentPageNo,
      );

      this.target = document.getElementById(containerId);
      this.target.appendChild(this.container);
    }

    updateSelect(currentPageNo, totalPages) {
      updateSelectOptions(
        this.selectCurrentPageNo,
        Array.from({ length: totalPages }, (_, i) => i + 1),
        currentPageNo
      );
    }

    // renderPaginationResults({ totalPages, currentPageNo, result, renderFunction }) {

    // this.previousBtn = this.createElementComponent.createButton({
    //   text: "Previous",
    //   eventToAdd: () => this.onPrevious?.(),
    // });
    // this.nextBtn = this.createElementComponent.createButton({
    //   text: "Next",
    //   eventToAdd: () => this.onNext?.(),
    // });
    // just put these here, they belong somwhere else
    //   renderFunction(result)
    //   this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
    //   this.previousBtn.disabled = currentPageNo <= 1;
    //   this.nextBtn.disabled = currentPageNo >= totalPages;
    // }
  }

  function dateParser(value) {
    return new Date(value);
  }

  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getPaginatedElements(
    elementList,
    { currentPageNo, itemsPerPage },
  ) {
    const start = (currentPageNo - 1) * itemsPerPage;
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

    getPaginatedItems(
      { currentPageNo, itemsPerPage },
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
          currentPageNo,
          itemsPerPage,
        });
        const totalPages = getTotalPages(items, itemsPerPage);

        resolve({ paginatedItems, totalPages });
      });
    }
  }

  class TaskService {
    constructor(taskData) {
      taskData.forEach((task) => {
        dateParser(task.creationDate);
      });
      this.service = new DbService(taskData);
    }

    saveTask(newTask) {
      const id = generateGUID();
      newTask.id = id;
      return this.service.save(newTask);
    }

    getTaskById(id) {
      return this.service.findById(id);
    }

    updateTask(task) {
      const { id, ...props } = task;
      return this.service.update(id, props);
    }

    getTasks = (
      { currentPageNo, itemsPerPage },
      sortCriteria = [],
      filterCriteria = [],
    ) => {
      return this.service.getPaginatedItems(
        { currentPageNo, itemsPerPage },
        sortCriteria,
        filterCriteria,
      );
    };
  }

  function renderTasks(containerId, taskList) {
    const container = document.getElementById(containerId);
      container.innerHTML = "";

      taskList.forEach((element) => {
        const card = document.createElement("div");
        card.className = "task-card";
        card.innerHTML = `<h2>${element.title}</h2>
        <p>Status: ${element.status}</p>
        <p>${element.description}</p>
        <p>Assigned to: ${element.userName}</p>
        <p>Created at: ${element.creationDate}</p>`;
        container.appendChild(card);
      });
      return taskList;
  }

  class TaskPresentationUI {
    constructor(containerId) {
      this.createElementComponent = new CreateElementComponent();
      this.container = this.createElementComponent.createDiv();
      this.pageIndicator = this.createElementComponent.createSpan();

      this.target = document.getElementById(containerId);
      this.target.appendChild(this.container);
      this.container.append(this.pageIndicator);
    }

    renderTasks = ({ paginatedItems, totalPages }, currentPageNo) => {
      renderTasks("taskPaginationContainer", paginatedItems);
      this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
    };
  }

  class PagerData {
    constructor(onPagerDataChanged = null) {
      this.currentPageNo = 1;
      this.itemsPerPage = 5;

      this.onPagerDataChanged = onPagerDataChanged;
    }

    setItemsPerPage = (itemsPerPageNr) => {
      this.itemsPerPage = itemsPerPageNr;
      this.currentPageNo = 1;
      this.onPagerDataChanged({
        currentPageNo: this.currentPageNo,
        itemsPerPageNo: this.itemsPerPage,
      });
    };

    setCurrentPageNo = (newPageNo) => {
      this.currentPageNo = newPageNo;
      this.onPagerDataChanged({
        currentPageNo: this.currentPageNo,
        itemsPerPageNo: this.itemsPerPage,
      });
    };

    init() {
      this.onPagerDataChanged({
        currentPageNo: this.currentPageNo,
        itemsPerPageNo: this.itemsPerPage,
      });
    }
  }

  class PaginationHandler {
    constructor({
      paginationFunction = null,
      onPaginationResponse = null,
      pagerData = null,
      sortCriteria = null,
    } = {}) {
      this.paginationFunction = paginationFunction;
      this.onPaginationResponse = onPaginationResponse;
      // this.pagerComponent.onNext = this.onNext;
      // this.pagerComponent.onPrevious = this.onPrevious;

      this.pagerData = pagerData;

      this.pagerData.onPagerDataChanged = () => this.getItems(this.pagerData);

      this.sortCriteria = sortCriteria;

      this.sortCriteria.onSortListCriteriaChanged = () =>
        this.getItems(this.pagerData);

      // this.sortCriteria.onSortCriteriaListChange = () => this.getItems(this.pagerData);
    }

    //calls the pagination function and passes the result to pagination response
    getItems = ({ currentPageNo, itemsPerPage }) => {
      this.paginationFunction(
        {
          currentPageNo,
          itemsPerPage,
        },
        this.sortCriteria.sortCriteriaList,
      ).then(({ paginatedItems, totalPages }) => {
        this.onPaginationResponse({ paginatedItems, totalPages });
      });
    };

    // onNext = () => {
    //   //have to use pager data somehow
    //   if (this.pagerData.currentPageNo < this.totalPages) {
    //     this.pagerData.currentPageNo++;
    //   }
    //   this.getItems();
    // };

    // onPrevious = () => {
    //   if (this.pagerData.currentPageNo > 1) {
    //     this.pagerData.currentPageNo--;
    //   }
    //   this.getItems();
    // };
  }

  class SortTaskControlUI {
    constructor({
      containerId,
      onSortCriteriaChanged,
    }) {
      this.onSortCriteriaChanged = onSortCriteriaChanged;

      this.createElementComponent = new CreateElementComponent();
      this.container = this.createElementComponent.createDiv();

      this.sortByTitleBtn = this.createElementComponent.createButton({
        text: "Sort by title",
        eventToAdd: () => this.onSortCriteriaChanged("title"),
      });
    
      this.sortByDateBtn = this.createElementComponent.createButton({
        text: "Sort by date",
        eventToAdd: () => this.onSortCriteriaChanged("creationDate"),
      });

      this.titleArrow = this.createElementComponent.createSpan();
      this.dateArrow = this.createElementComponent.createSpan();

      this.container.append(
        this.sortByTitleBtn,
        this.titleArrow,
        this.sortByDateBtn,
        this.dateArrow,
      );
      this.target = document.getElementById(containerId);
      this.target.append(this.container);
    }

    setTitleArrow(sortDirection) {
      switch (sortDirection) {
        case 1:
          this.titleArrow.textContent = "\u2191";
          break;
        case -1:
          this.titleArrow.textContent = "\u2193";
          break;
        default:
          this.titleArrow.textContent = "";
          break;
      }
    }

    setDateArrow(sortDirection) {
      switch (sortDirection) {
        case 1:
          this.dateArrow.textContent = "\u2191";
          break;
        case -1:
          this.dateArrow.textContent = "\u2193";
          break;
        default:
          this.dateArrow.textContent = "";
          break;
      }
    }
  }

  function updateCriteria({ optionList, option, removingCriteria }) {
    const elementIndex = optionList.findIndex(
      (o) => o.property === option.property,
    );

    if (elementIndex === -1) {
      optionList.push(option);
    }
    
    if (removingCriteria(option)) {
      optionList.splice(elementIndex, 1);
    } else {
      optionList[elementIndex] = option;
    }

    return optionList;
  }

  //** this creates the sorting criteria for the property propertyType */
  class SortCriteria {
    constructor({ propertyType, onSortCriteriaCreated } = {}) {
      this.propertyType = propertyType;
      this.clickCounter = 0;
      this.sortOption = { property: propertyType, direction: 0 };

      this.onSortCriteriaCreated = onSortCriteriaCreated;
    }

    setSortCriteria = () => {
      this.clickCounter = (this.clickCounter + 1) % 3;
      this.sortOption.direction = this.getSortDirection(this.clickCounter);
      // const propertySortOption = {
      //   property: this.propertyType,
      //   direction: this.sortDirection,
      // };

      this.onSortCriteriaCreated(this.sortOption); // sa adauge/modifice optiunea din sortare, functia va fi in sort handler
    };

    getSortDirection(counter) {
      switch (counter) {
        case 1:
          return 1;
        case 2:
          return -1;
        default:
          return 0;
      }
    }
  }

  class SortCriteriaHandler {
    constructor({onSortCriteriaListChange = null, sortCriteria = null} = {}) {
      this.sortCriteriaList = [];
      this.onSortCriteriaListChange = onSortCriteriaListChange;

      this.sortCriteria = sortCriteria;

      this.sortCriteria.onSortCriteriaCreated = () => this.setSortOption(this.sortCriteria.sortOption);
    }

    setSortOption = (option) => {
      updateCriteria({
        optionList: this.sortCriteriaList,
        option: option,
        removingCriteria: (opt) => opt.direction === 0,
      });

      this.onSortCriteriaListChange(); // pass this list to pagination handler
    }
  }

  class TaskLogic {
    constructor({ initialTaskData = [] } = {}) {
      this.taskService = new TaskService(initialTaskData);
      this.pagerData = new PagerData();
      // this.taskSortCriteria = new TaskSortCriteria();
      this.titleSortCriteria = new SortCriteria({ propertyType: "title" });

      this.taskPresentationUI = new TaskPresentationUI("taskPageControlBtn");
      this.pagerComponentUI = new PagerComponentUI({
        containerId: "taskPerPageSelect",
        onItemsPerPageChange: this.pagerData.setItemsPerPage,
        onCurrentPageChange: this.pagerData.setCurrentPageNo,
      });
      this.sortTaskControlUI = new SortTaskControlUI({
        containerId: "sortTaskContainer",
        onSortCriteriaChanged: () => this.titleSortCriteria.setSortCriteria(),
      });

      this.sortCriteriaHandler = new SortCriteriaHandler({
        sortCriteria: this.titleSortCriteria,
      });

      this.paginationHandler = new PaginationHandler({
        paginationFunction: this.taskService.getTasks,
        onPaginationResponse: this.onPaginationResponse,
        pagerData: this.pagerData,
        sortCriteria: this.sortCriteriaHandler,
      });
    }

    onPaginationResponse = ({ paginatedItems, totalPages }) => {
      this.pagerComponentUI.updateSelect(
        this.pagerData.currentPageNo,
        totalPages,
      );
      this.taskPresentationUI.renderTasks(
        { paginatedItems, totalPages },
        this.pagerData.currentPageNo,
      );
      // this.sortTaskControlUI.setTitleArrow(
      //   this.taskSortCriteria.titleSortDirection,
      // );
      // this.sortTaskControlUI.setDateArrow(
      //   this.taskSortCriteria.dateSortDirection,
      // );
    };

    init() {
      this.pagerData.init();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const taskLogic = new TaskLogic({initialTaskData});
    taskLogic.init();
  });

})();

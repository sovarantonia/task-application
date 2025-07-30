(function () {
  'use strict';

  const initialTaskData = [
    {
      id: "24ab0076-1acc-41c2-952e-ca889c8c7695",
      title: "Fix login bug",
      description: "Users cannot log in with correct credentials.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      user: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      date: "2025-06-15",
    },
    {
      id: "1e0a63a7-6445-4254-8d58-9d8b19ab72e3",
      title: "Add user profile page",
      description:
        "Create a page where users can update their personal information.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      user: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      date: "2025-06-14",
    },
    {
      id: "6a274a51-94cc-4244-b0fd-cc232f61d671",
      title: "Optimize database queries",
      description:
        "Improve the performance of slow-loading pages by optimizing queries.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      user: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      date: "2025-06-12",
    },
    {
      id: "b6354a2b-2adf-4954-9fbe-61c783b89360",
      title: "Implement dark mode",
      description: "Add an option for users to toggle dark mode in settings.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      user: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      date: "2025-06-13",
    },
    {
      id: "43b82409-8234-44cf-a4b3-8dc590a6df6b",
      title: "Write integration tests for user service",
      description:
        "Ensure critical user workflows are covered by integration tests.",
      status: "b9920485-9f7e-4e82-bba6-3b761df91cb4",
      user: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      date: "2025-06-15",
    },
    {
      id: "4c20f508-a24c-41ba-97ff-e34616d2c57c",
      title: "Fix password reset issue",
      description: "Reset link fails for accounts created before 2024.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      user: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      date: "2025-06-16",
    },
    {
      id: "41634150-0e26-4f2d-a62c-abadc417eaa4",
      title: "Redesign user profile UI",
      description: "Modernize the layout of the user profile page.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      user: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      date: "2025-06-17",
    },
    {
      id: "fcbbf209-17b9-4e41-a307-71235780de6e",
      title: "Add indexing to improve search speed",
      description: "Use PostgreSQL indexing to enhance filtering by title.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      user: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      date: "2025-06-17",
    },
    {
      id: "abf36db4-4446-4404-a58e-6ca43bc1db22",
      title: "Add system-wide color theme toggle",
      description: "Support dynamic switching between themes.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      user: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      date: "2025-06-18",
    },
    {
      id: "eff52628-aae3-4357-8857-6713c56f1f7e",
      title: "Refactor test suite structure",
      description: "Organize unit and integration tests into separate folders.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      user: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      date: "2025-06-18",
    },
    {
      id: "35f172b6-b462-4d37-91c2-91d3938321c2",
      title: "Fix login redirect bug",
      description: "Users stay on login page even after successful login.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      user: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      date: "2025-06-10",
    },
    {
      id: "5acef95d-1971-45cd-ae8f-c789cb256807",
      title: "Add avatar upload on profile page",
      description: "Users can upload and crop their profile picture.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      user: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      date: "2025-06-19",
    },
    {
      id: "563a2664-bf68-43d7-9b3d-3899bf24bd08",
      title: "Clean up deprecated SQL queries",
      description: "Remove old joins and improve query structure.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      user: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      date: "2025-06-09",
    },
    {
      id: "95a896da-f3be-4f92-b60e-c5c390e1e4c4",
      title: "Improve dark mode contrast",
      description: "Adjust color palette for better accessibility in dark mode.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      user: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      date: "2025-06-20",
    },
    {
      id: "118763b8-6d69-4a7c-901e-c41fd97f1fde",
      title: "Test PDF export functionality",
      description: "Validate correctness of downloaded PDFs for shared notes.",
      status: "b9920485-9f7e-4e82-bba6-3b761df91cb4",
      user: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      date: "2025-06-20",
    },
    {
      id: "f98e4427-0c0c-4d83-9f00-1866f9683a47",
      title: "Fix session timeout bug",
      description: "Auto logout occurs prematurely after login.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      user: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      date: "2025-06-21",
    },
    {
      id: "01734573-74cf-41e7-84e4-e0635529fbea",
      title: "Add contact information section",
      description: "Enable users to save multiple contact details.",
      status: "44d21520-d383-4bc3-b6db-848f3545df56",
      user: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      date: "2025-06-21",
    },
    {
      id: "b0c420d1-21d1-4431-a8af-0b43cf8732ef",
      title: "Analyze DB performance metrics",
      description: "Generate weekly reports on slow queries and memory usage.",
      status: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79",
      user: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      date: "2025-06-11",
    },
    {
      id: "25c76bc3-177e-4bc9-834a-5d15dfdde382",
      title: "Add auto dark mode using system preference",
      description: "Use media query to detect and apply user's OS theme.",
      status: "ad06176e-88cd-4eee-90b5-44fcea585434",
      user: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      date: "2025-06-22",
    },
    {
      id: "5ad61f51-d697-43b4-afad-e88538399827",
      title: "Expand test coverage for PDF module",
      description: "Cover edge cases and error handling in export logic.",
      status: "b9920485-9f7e-4e82-bba6-3b761df91cb4",
      user: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      date: "2025-06-22",
    },
  ];

  function createElementComponent({ elementType = "", text = "" }) {
    let element = document.createElement(elementType);
    switch (elementType) {
      case "span":
        element.textContent = text;
        break;

      case "div":
        break;

      case "p":
        element.innerText = text;
        break;
    }

    return element;
  }

  class SelectComponent {
    createSelect({
      list = [],
      onSelectionChanged = null,
      key = null,
      value = null,
      defaultOptionLabel = "",
    }) {
      const select = document.createElement("select");
      if (defaultOptionLabel) {
        select.append(this.getOption(defaultOptionLabel));
      }
      list.forEach((element) => {
        select.append(this.getOption(element, key, value));
      });

      select.addEventListener("change", onSelectionChanged);
      return select;
    }

    getOption(element, key = null, value = null) {
      const opt = document.createElement("option");
      opt.value = element;
      opt.textContent = element;
      if (key && value) {
        opt.value = element[key];
        opt.textContent = element[value];
      }
      return opt;
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

    if (currentPage > 0) {
      selectComponent.options[currentPage - 1].selected = true;
    }
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

      const target = document.getElementById(containerId);

      const select = new SelectComponent();

      this.selectItemsPerPage = select.createSelect({
        list: [5, 10],
        onSelectionChanged: (e) =>
          this.onItemsPerPageChange(parseInt(e.target.value)),
      });

      this.selectItemsPerPageSpan = createElementComponent({
        elementType: "span",
        text: "Items per page",
      });

      this.selectCurrentPageSpan = createElementComponent({
        elementType: "span",
        text: "Page",
      });

      this.selectCurrentPageNo = select.createSelect({
        onSelectionChanged: (e) =>
          this.onCurrentPageChange(parseInt(e.target.value)),
      });

      target.append(
        this.selectItemsPerPageSpan,
        this.selectItemsPerPage,
        this.selectCurrentPageSpan,
        this.selectCurrentPageNo,
      );
    }

    updateSelect(currentPageNo, totalPages) {
      updateSelectOptions(
        this.selectCurrentPageNo,
        Array.from({ length: totalPages }, (_, i) => i + 1),
        currentPageNo,
      );
    }
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
        dateParser(task.date);
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
        <p>Assigned to: ${element.user}</p>
        <p>Created at: ${element.date}</p>`;
        container.appendChild(card);
      });
      return taskList;
  }

  class TaskPresentationUI {
    constructor(containerId) {
      const target = document.getElementById(containerId);
      this.pageIndicator = createElementComponent({
        elementType: "span",
      });
      target.append(this.pageIndicator);
    }

    renderTasks = ({ paginatedItems, totalPages }, currentPageNo) => {
      renderTasks("taskPaginationContainer", paginatedItems);
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
    } = {}) {
      this.paginationFunction = paginationFunction;
      this.onPaginationResponse = onPaginationResponse;
      // this.pagerComponent.onNext = this.onNext;
      // this.pagerComponent.onPrevious = this.onPrevious;

      this.pagerData = pagerData;
      this.pagerData.onPagerDataChanged = () => this.getItems(this.pagerData);
    }

    //calls the pagination function and passes the result to pagination response
    getItems = ({ currentPageNo, itemsPerPage }) => {
      this.paginationFunction({
        currentPageNo,
        itemsPerPage,
      }, this.sortCriteria, this.filterCriteria).then(({ paginatedItems, totalPages }) => {
        this.onPaginationResponse({ paginatedItems, totalPages });
      });
    };

    onSortCriteriaChanged = (sortCriteria) => {
      this.sortCriteria = sortCriteria;
      this.getItems(this.pagerData, this.sortCriteria, this.filterCriteria);
    };

    onFilterCriteriaChanged = (filterCriteria) => {
      this.filterCriteria = filterCriteria;
      this.getItems(this.pagerData, this.sortCriteria, this.filterCriteria);
    }

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

  class CreateElementComponent {
    constructor(containerId = null) {
      this.target = document.getElementById(containerId);
    }

    createElement({ elementType = "", text = "", eventToAdd = null } = {}) {
      let element = document.createElement(elementType);
      switch (elementType) {
        case "button":
          element.textContent = text;
          element.addEventListener("click", eventToAdd);
          break;

        case "span":
          element.textContent = text;
          break;

        case "div":
          break;

        case "p":
          element.innerText = text;
          break;
      }
      this.target.append(element);

      return element;
    }
  }

  class SortControlUI {
    constructor({ containerId, onSortCriteriaChanged, columnList = [] }) {
      this.onSortCriteriaChanged = onSortCriteriaChanged;

      this.createElementComponent = new CreateElementComponent(containerId);

      for (let column of columnList) {
        this.sortByColumnBtn = this.createElementComponent.createElement({
          elementType: "button",
          text: `Sort by ${column}`,
          eventToAdd: () => {
            this.onSortCriteriaChanged(column);
          },
        });
      }

      // this.titleArrow = this.createElementComponent.createSpan();
      // this.dateArrow = this.createElementComponent.createSpan();
    }

    // setTitleArrow(sortDirection) {
    //   switch (sortDirection) {
    //     case 1:
    //       this.titleArrow.textContent = "\u2191";
    //       break;
    //     case -1:
    //       this.titleArrow.textContent = "\u2193";
    //       break;
    //     default:
    //       this.titleArrow.textContent = "";
    //       break;
    //   }
    // }

    // setDateArrow(sortDirection) {
    //   switch (sortDirection) {
    //     case 1:
    //       this.dateArrow.textContent = "\u2191";
    //       break;
    //     case -1:
    //       this.dateArrow.textContent = "\u2193";
    //       break;
    //     default:
    //       this.dateArrow.textContent = "";
    //       break;
    //   }
    // }
  }

  //** this creates the sorting criteria for the property propertyType */
  class SortCriteria {
    constructor({ propertyType, direction = 0, onSortCriteriaCreated } = {}) {
      this.sortOption = { property: propertyType, direction: direction };

      this.onSortCriteriaCreated = onSortCriteriaCreated;
    }

    setSortCriteria = () => {
      this.sortOption.direction =
        this.sortOption.direction + 1 > 1 ? -1 : this.sortOption.direction + 1;

      this.onSortCriteriaCreated(this.sortOption); // pass this to sort handler
    };
  }

  class SortCriteriaHandler {
    constructor({ onNotifyPaginationHandler = null } = {}) {
      this.sortCriteriaList = new Map();
      this.onNotifyPaginationHandler = onNotifyPaginationHandler;
    }

    setSortOption = (option) => {
      this.sortCriteriaList.set(option.property, option.direction);
      const sortCriteria = this.sortCriteriaList
        .entries()
        .reduce((acc, [key, value]) => {
          if (value != 0) {
            acc.push({
              property: key,
              direction: value,
            });
          }
          return acc;
        }, []);
      this.onNotifyPaginationHandler(sortCriteria); // pass this list to pagination handler
    };

    onSortCriteriaChanged = (column) => {
      let sortCriteria;
      !this.sortCriteriaList.has(column)
        ? (sortCriteria = new SortCriteria({
            propertyType: column,
            onSortCriteriaCreated: (option) => this.setSortOption(option),
          }))
        : (sortCriteria = new SortCriteria({
            propertyType: column,
            direction: this.sortCriteriaList.get(column),
            onSortCriteriaCreated: (option) => this.setSortOption(option),
          }));

      sortCriteria.setSortCriteria();
    };
  }

  class FilterCriteria {
    constructor({ propertyType, onFilterCriteriaCreated }) {
      this.filterOption = { property: propertyType, value: "All" };
      this.onFilterCriteriaCreated = onFilterCriteriaCreated;
    }

    setFilterCriteria = (newValue) => {
      this.filterOption.value = newValue;
      this.onFilterCriteriaCreated(this.filterOption);
    };
  }

  class FilterCriteriaHandler {
    constructor({onNotifyPaginationHandler}) {
      this.onNotifyPaginationHandler = onNotifyPaginationHandler;

      this.filterCriteriaList = new Map();
    }

    setFilterOption = (option) => {
      this.filterCriteriaList.set(option.property, option.value);
      const filterCriteria = this.filterCriteriaList
        .entries()
        .reduce((acc, [key, value]) => {
          if (value !== "All") {
            acc.push({
              property: key,
              value: value,
            });
          }
          return acc;
        }, []);
      this.onNotifyPaginationHandler(filterCriteria);
    };

    onFilterCriteriaChanged = (column, newValue) => {
      const filterCriteria = new FilterCriteria({
        propertyType: column,
        onFilterCriteriaCreated: (option) => this.setFilterOption(option),
      });

      filterCriteria.setFilterCriteria(newValue);
    };
  }

  class FilterControlUI {
    constructor({
      containerId,
      onFilterCriteriaChanged,
      columnOptionList = [],
      keyValue = [],
    }) {
      this.onFilterCriteriaChanged = onFilterCriteriaChanged;

      const target = document.getElementById(containerId);

      const select = new SelectComponent();

      for (let i = 0; i < columnOptionList.length; i++) {
        this.createSelectComponent = select.createSelect({
          list: columnOptionList[i],
          onSelectionChanged: (e) =>
            this.onFilterCriteriaChanged(keyValue[i].value, e.target.value),
          key: keyValue[i].key,
          value: keyValue[i].value,
          defaultOptionLabel: "All",
        });
        this.filterBySpan = createElementComponent({
          elementType: "span",
          text: `Filter by ${keyValue[i].value}: `,
        });

        target.append(this.filterBySpan, this.createSelectComponent);
      }
    }
  }

  const taskStatus = [
    { id: "ad06176e-88cd-4eee-90b5-44fcea585434", status: "To Do" },
    { id: "44d21520-d383-4bc3-b6db-848f3545df56", status: "In Progress" },
    { id: "b9920485-9f7e-4e82-bba6-3b761df91cb4", status: "In Review" },
    { id: "d6c5c0b2-0b99-400d-8561-7c30b3bb0e79", status: "Done" },
  ];

  const initialUserData = [
    {
      id: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      user: "Alice Morgan",
      email: "alice.morgan@example.com",
      department: "Backend Development",
    },
    {
      id: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      user: "Dana Kim",
      email: "dana.kim@example.com",
      department: "UX/UI Design",
    },
    {
      id: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      user: "Eva Thompson",
      email: "eva.thompson@example.com",
      department: "Quality Assurance",
    },
    {
      id: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      user: "Bob Daniels",
      email: "bob.daniels@example.com",
      department: "Frontend Development",
    },
    {
      id: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      user: "Charlie Wu",
      email: "charlie.wu@example.com",
      department: "Database Engineering",
    },
    {
      id: "f8c2f610-08c3-42f6-bbde-f94fc53119ea",
      user: "Henry Patel",
      email: "henry.patel@example.com",
      department: "IT Support",
    },
    {
      id: "bd23c62f-205b-44aa-8b63-d0bfb749d4b9",
      user: "Isla Novak",
      email: "isla.novak@example.com",
      department: "Legal",
    },
    {
      id: "4f2fd22d-74cc-40bb-9600-2e9e83f223db",
      user: "Frank Ortega",
      email: "frank.ortega@example.com",
      department: "Project Management",
    },
    {
      id: "8ea1de6b-681b-4d47-a4f7-abc9c7e19e02",
      user: "Grace Lee",
      email: "grace.lee@example.com",
      department: "Customer Support",
    },
    {
      id: "3e4a3c5f-f6c7-442b-8c17-ccdd75ef1b7e",
      user: "Jack Reynolds",
      email: "jack.reynolds@example.com",
      department: "Operations",
    },
  ];

  class TaskLogic {
    constructor({ initialTaskData = [] } = {}) {
      this.taskService = new TaskService(initialTaskData);
      this.pagerData = new PagerData();

      this.paginationHandler = new PaginationHandler({
        paginationFunction: this.taskService.getTasks,
        onPaginationResponse: this.onPaginationResponse,
        pagerData: this.pagerData,
      });

      this.sortCriteriaHandler = new SortCriteriaHandler({
        onNotifyPaginationHandler: this.paginationHandler.onSortCriteriaChanged,
      });

      this.filterCriteriaHandler = new FilterCriteriaHandler({
        onNotifyPaginationHandler: this.paginationHandler.onFilterCriteriaChanged,
      });

      this.taskPresentationUI = new TaskPresentationUI("taskPageIndicator");

      const { setItemsPerPage, setCurrentPageNo } = this.pagerData;
      this.pagerComponentUI = new PagerComponentUI({
        containerId: "taskPerPageSelect",
        onItemsPerPageChange: setItemsPerPage,
        onCurrentPageChange: setCurrentPageNo,
      });

      this.sortTaskControlUI = new SortControlUI({
        containerId: "sortTaskContainer",
        onSortCriteriaChanged: this.sortCriteriaHandler.onSortCriteriaChanged,
        columnList: ["title", "date"],
      });
      this.filterTaskControlUI = new FilterControlUI({
        containerId: "filterTaskContainer",
        onFilterCriteriaChanged:
          this.filterCriteriaHandler.onFilterCriteriaChanged,
        columnOptionList: [taskStatus, initialUserData],
        keyValue: [
          { key: "id", value: "status" },
          { key: "id", value: "user" },
        ],
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

  class UserService {
    constructor(userData) {
      this.service = new DbService(userData);
    }

    getUsers = (
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

    sendEmail(userList) {
      return new Promise((resolve) => {
        const infoList = userList.map((element) => {
          const msg = `Sent mail to ${element.userName} (${element.email})`;
          console.log(msg);
          return msg;
        });
        resolve(infoList);
      });
    }

    getById(userId) {
      return this.service.findById(userId);
    }
  }

  function renderUsers(users, containerId) {
    const container = document.getElementById(containerId);
    // const createElementComponent = new CreateElementComponent(containerId);

    container.innerHTML = "";

    users.forEach((element) => {
      const card = createElementComponent({ elementType: "div" });
      card.className = "user-card";
      // const checkbox = createElementComponent.createCheckbox({
      //   value: element.id,
      //   eventToAdd: (e) => {
      //     eventToAdd?.(e.target.value, e.target.checked);
      //   },
      // });
      // checkbox.id = element.id;
      const nameInfo = createElementComponent({
        elementType: "p",
        text: `${element.user}`,
      });
      const emailInfo = createElementComponent({
        elementType: "p",
        text: `Email: ${element.email}`,
      });
      const departmentInfo = createElementComponent({
        elementType: "p",
        text: `Department: ${element.department}`,
      });

      card.append(nameInfo, emailInfo, departmentInfo);
      container.appendChild(card);
    });
    return users;
  }

  class UserPresentationUI {
    constructor(containerId) {
      this.containerId = containerId;
    }

    renderUsers = ({ paginatedItems, totalPages }, currentPageNo) => {
      renderUsers(paginatedItems, this.containerId);
    };
  }

  class UserLogic {
    constructor({ initialUserData = [] }) {
      this.userService = new UserService(initialUserData);
      this.pagerData = new PagerData();

      this.paginationHandler = new PaginationHandler({
        paginationFunction: this.userService.getUsers,
        onPaginationResponse: this.onPaginationResponse,
        pagerData: this.pagerData,
      });

      this.sortCriteriaHandler = new SortCriteriaHandler({
        onNotifyPaginationHandler: this.paginationHandler.onSortCriteriaChanged,
      });

      this.userPresentationUI = new UserPresentationUI("userContainer");

      this.pagerComponentUI = new PagerComponentUI({
        containerId: "userPageControls",
        onItemsPerPageChange: this.pagerData.setItemsPerPage,
        onCurrentPageChange: this.pagerData.setCurrentPageNo,
      });
      this.sortUserControlUI = new SortControlUI({
        containerId: "sortUserContainer",
        onSortCriteriaChanged: this.sortCriteriaHandler.onSortCriteriaChanged,
        columnList: ["user"],
      });

      // this.checkboxStateMap = new Map();
    }

    onPaginationResponse = ({ paginatedItems, totalPages }) => {
      this.userPresentationUI.renderUsers(
        { paginatedItems, totalPages },
        this.pagerData.currentPageNo,
      );

      this.pagerComponentUI.updateSelect(
        this.pagerData.currentPageNo,
        totalPages,
      );
    };

    init() {
      this.pagerData.init();
    }

    // onSelect = (userId, isChecked) => {
    //   isChecked
    //     ? this.checkboxStateMap.set(userId, isChecked)
    //     : this.checkboxStateMap.delete(userId);
    //   this.checkboxSelectComponent.renderSelectedItemNr(
    //     this.checkboxStateMap.size,
    //   );
    // };

    // onClick = () => {
    //   const promises = [];
    //   for (const id of this.checkboxStateMap.keys()) {
    //     promises.push(this.userService.getById(id));
    //   }

    //   Promise.all(promises)
    //     .then((userInfoList) => {
    //       return this.userService.sendEmail(userInfoList);
    //     })
    //     .then((messages) => {
    //       messages;
    //     });
    // };
  }

  document.addEventListener("DOMContentLoaded", () => {
    const taskLogic = new TaskLogic({ initialTaskData });
    taskLogic.init();
    const userLogic = new UserLogic({ initialUserData });
    userLogic.init();
  });

})();

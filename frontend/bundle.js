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

  function createElementComponent({
    elementType = "",
    text = "",
    elementId = null,
  }) {
    let element = document.createElement(elementType);
    if (elementId) {
      element.id = elementId;
    }

    switch (elementType) {
      case "span":
        element.textContent = text;
        break;

      case "p":
        element.innerText = text;
        break;

      case "h1":
        element.textContent = text;
        break;

      case "h2":
        element.textContent = text;
        break;

      case "h3":
        element.textContent = text;
        break;

      case "h4":
        element.textContent = text;
        break;

      case "h5":
        element.textContent = text;
        break;

      case "h6":
        element.textContent = text;
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
      defaultOptionLabel = '',
      selectId = null,
    }) {
      this.select = document.createElement('select');

      if (selectId) {
        this.select.id = selectId;
        this.select.name = selectId;
      }

      if (defaultOptionLabel) {
        this.select.append(this.getOption({element: defaultOptionLabel}));
      }
      list.forEach((element) => {
        this.select.append(this.getOption({element, key, value}));
      });

      this.select.addEventListener('change', onSelectionChanged);
      return this.select;
    }

    getOption({element, key = null, value = null}) {
      const opt = document.createElement('option');
      opt.value = element;
      opt.textContent = element;
      if (key && value) {
        opt.value = element[key];
        opt.textContent = element[value];
      }
      return opt;
    }

    updateSelect({
      select,
      options = [],
      key = null,
      value = null,
      defaultOptionLabel = '',
    }) {
      let optionNo = select.options.length - 1;
      if (optionNo > 0) {
        for (let i = optionNo; i >= 0; i--) {
          select.remove(i);
        }
      }

      if (defaultOptionLabel) {
        select.append(this.getOption({element: defaultOptionLabel}));
      }

      options.forEach((element) => {
        select.append(this.getOption({element, key, value}));
      });

      return select;
    }
  }

  function updatePageSelectOptions({
    selectComponent,
    totalPages,
    currentPage,
  }) {
    let optionNo = selectComponent.options.length - 1;
    if (optionNo > 0) {
      for (let i = optionNo; i >= 0; i--) {
        selectComponent.remove(i);
      }
    }

    const options = Array.from({ length: totalPages }, (_, i) => i + 1);

    options.forEach((element) => {
      const opt = document.createElement("option");
      opt.value = element;
      opt.textContent = element;
      selectComponent.append(opt);
    });

    if (totalPages > 0) {
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

    updateSelect({ currentPageNo, totalPages }) {
      updatePageSelectOptions({
        selectComponent: this.selectCurrentPageNo,
        totalPages: totalPages,
        currentPage: currentPageNo,
      });
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
    { elementList, currentPageNo, itemsPerPage },
  ) {
    const start = (currentPageNo - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return elementList.slice(start, end);
  }

  function getTotalPages({elementList, itemsPerPage}) {
    return Math.ceil(elementList.length / itemsPerPage);
  }

  function combineComparisonFunctions({compareFunctions}) {
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

  function multiFieldSort({criteria}) {
    const compareFunctions = criteria.map(({ property, direction }) => {
      return (a, b) => {
        if (a[property] === b[property]) return 0;
        return a[property] < b[property] ? -direction : direction;
      };
    });

    return combineComparisonFunctions({compareFunctions});
  }

  function multiFieldFilter({criteria}) {
    const filterFunctions = criteria.map(({ property, value }) => {
      return (item) => item[property] === value;
    });

    return combineFilterComparisonFunctions({functions: filterFunctions});
  }

  function combineFilterComparisonFunctions({functions}) {
    return (item) => {
      return functions.every((f) => f(item));
    };
  }

  class DbService {
    constructor(initialData) {
      this.objectList = initialData;
    }

    save({ objToSave }) {
      return new Promise((resolve) => {
        this.objectList.push(objToSave);
        resolve(objToSave);
      });
    }

    update({ id, props }) {
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

    getPaginatedItems({
      currentPageNo,
      itemsPerPage,
      sortCriteria = [],
      filterCriteria = [],
    }) {
      return new Promise((resolve) => {
        let items = [...this.objectList];

        if (filterCriteria.length > 0) {
          items = items.filter(multiFieldFilter({ criteria: filterCriteria }));
        }

        if (sortCriteria.length > 0) {
          items = items.sort(multiFieldSort({ criteria: sortCriteria }));
        }

        const paginatedItems = getPaginatedElements({
          elementList: items,
          currentPageNo,
          itemsPerPage,
        });
        const totalPages = getTotalPages({ elementList: items, itemsPerPage });

        setTimeout(() => resolve({ paginatedItems, totalPages }), 2000);
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

    saveTask({newTask}) {
      const id = generateGUID();
      newTask.id = id;
      return this.service.save({objToSave: newTask});
    }

    getTaskById(id) {
      return this.service.findById(id);
    }

    updateTask({task}) {
      const { id, ...props } = task;
      return this.service.update({id: id, props: props});
    }

    getPaginatedTasks = ({
      currentPageNo,
      itemsPerPage,
      sortCriteria = [],
      filterCriteria = [],
    }) => {
      return this.service.getPaginatedItems({
        currentPageNo,
        itemsPerPage,
        sortCriteria,
        filterCriteria,
      });
    };
  }

  function createButton({ text = "", onClick = null, type = null }) {
    const element = document.createElement("button");
    element.textContent = text;
    element.innerHTML = text;
    if (type) {
      element.type = type;
    }
    element.addEventListener("click", onClick);
    return element;
  }

  function renderTasks({
    containerId,
    taskList,
    userMap,
    statusMap,
    onClick = null,
  }) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    taskList.forEach((element) => {
      const user = userMap.get(element.userId);
      const status = statusMap.get(element.statusId);

      const card = createElementComponent({ elementType: "div" });
      card.className = "card";
      const viewButton = createButton({
        text: "Assign task",
        onClick: () => onClick(element),
      });

      const title = createElementComponent({
        elementType: "h2",
        text: element.title,
      });
      const statusP = createElementComponent({
        elementType: "p",
        text: `Status: ${status}`,
      });
      const description = createElementComponent({
        elementType: "p",
        text: element.description,
      });
      const assignedTo = createElementComponent({
        elementType: "p",
        text: `Assigned to: ${user}`,
      });
      const createdAt = createElementComponent({
        elementType: "p",
        text: `Created at: ${element.creationDate}`,
      });

      card.append(title, statusP, description, assignedTo, createdAt, viewButton);
      container.appendChild(card);
    });

    return taskList;
  }

  class TaskPresentationUI {
    constructor({ containerId, onViewClick }) {
      this.containerId = containerId;
      this.onViewClick = onViewClick;
    }

    renderTasks = ({ paginatedItems, userMap, statusMap }) => {
      renderTasks({
        containerId: this.containerId,
        taskList: paginatedItems,
        userMap,
        statusMap,
        onClick: (item) => this.onViewClick(item)
      });
    };
  }

  class PagerData {
    constructor({onPagerDataChanged = null}) {
      this.currentPageNo = 1;
      this.itemsPerPage = 5;

      this.onPagerDataChanged = onPagerDataChanged;
    }

    setItemsPerPage = (itemsPerPageNr) => {
      this.itemsPerPage = itemsPerPageNr;
      this.currentPageNo = 1;
      this.onPagerDataChanged();
    };

    setCurrentPageNo = (newPageNo) => {
      this.currentPageNo = newPageNo;
      this.onPagerDataChanged();
    };

    init() {
      this.onPagerDataChanged();
    }
  }

  const loaderUtils = {
    addLoader: () => {
      const loader = document.getElementById("loading");
      const overlay = document.getElementById("overlay");
      loader.classList.remove("hidden");
      overlay.classList.remove("hidden");
    },
    hideLoader: () => {
      const loader = document.getElementById("loading");
      const overlay = document.getElementById("overlay");
      loader.classList.add("hidden");
      overlay.classList.add("hidden");
    },
  };

  class PaginationHandler {
    constructor({
      paginationFunction = null,
      onPaginationResponse = null,
      pagerData = null,
    } = {}) {
      this.paginationFunction = paginationFunction;
      this.onPaginationResponse = onPaginationResponse;

      this.pagerData = pagerData;
      this.pagerData.onPagerDataChanged = this.getPaginatedItems;

      this.sortCriteria = [];
      this.filterCriteria = [];
    }

    //calls the pagination function and passes the result to pagination response
    getPaginatedItems = () => {
      loaderUtils.addLoader();
      const { currentPageNo, itemsPerPage } = this.pagerData;

      return this.paginationFunction({
        currentPageNo: currentPageNo,
        itemsPerPage: itemsPerPage,
        sortCriteria: this.sortCriteria,
        filterCriteria: this.filterCriteria,
      }).then(({ paginatedItems, totalPages }) => {
        loaderUtils.hideLoader();

        this.onPaginationResponse({
          paginatedItems,
          totalPages,
          currentPageNo,
          itemsPerPage,
        });

      });
    };

    onSortCriteriaChanged = (sortCriteria) => {
      this.sortCriteria = sortCriteria;
      return this.getPaginatedItems();
    };

    onFilterCriteriaChanged = (filterCriteria) => {
      this.filterCriteria = filterCriteria;
      return this.getPaginatedItems();
    };
  }

  class SortControlUI {
    constructor({ containerId, onSortCriteriaChanged, columnMap }) {
      this.onSortCriteriaChanged = onSortCriteriaChanged;
      const target = document.getElementById(containerId);

      for (let column of columnMap.keys()) {
        this.sortByColumnBtn = createButton({
          text: `Sort by ${column}`,
          onClick: () => {
            this.onSortCriteriaChanged(column);
          },
        });
        target.append(this.sortByColumnBtn);
        // this.sortByColumnBtn.textContent += this.setTitleArrow(
        //   columnMap.get(column).direction,
        // );
        // console.log(columnMap.get(column).sortOption);
      }
    }

    setArrows(sortDirection) {
      switch (sortDirection) {
        case 1:
          return "\u2191";
        case -1:
          return "\u2193";
        default:
          return "";
      }
    }
  }

  //** this creates the sorting criteria for the property propertyType */
  class SortCriteria {
    constructor({
      propertyType,
      direction = 0,
      priority = 0,
      onSortCriteriaCreated,
    } = {}) {
      this.sortOption = { property: propertyType, direction: direction, priority: priority };
      this.onSortCriteriaCreated = onSortCriteriaCreated;
    }

    setSortCriteria = () => {
      this.sortOption.direction =
        this.sortOption.direction + 1 > 1 ? -1 : this.sortOption.direction + 1;

      this.onSortCriteriaCreated(this.sortOption); // pass this to sort handler
    };
  }

  class SortCriteriaHandler {
    constructor({ onNotifyPaginationHandler = null, columnList = [] } = {}) {
      this.sortCriteriaInstances = new Map();

      for (let column of columnList) {
        const sortCriteria = new SortCriteria({
          propertyType: column,
          direction: 0,
          priority: 0,
          onSortCriteriaCreated: (option) => this.setSortOption(option),
        });
        this.sortCriteriaInstances.set(column, sortCriteria);
      }

      this.lastPriority = 0;
      this.onNotifyPaginationHandler = onNotifyPaginationHandler;
    }

    setSortOption = (option) => {
      option.priority = ++this.lastPriority;
      const sortCriteria = this.sortCriteriaInstances
        .entries()
        .reduce((acc, [key, value]) => {
          const { direction, priority } = value.sortOption;
          if (direction !== 0) {
            acc.push({
              property: key,
              direction: direction,
              priority: priority,
            });
          }

          return acc;
        }, [])
        .sort((a, b) => a.priority - b.priority);
      this.onNotifyPaginationHandler(sortCriteria);
    };

    onSortCriteriaChanged = (column) => {
      const sortCriteria = this.sortCriteriaInstances.get(column);
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

      this.selectList = [];

      this.select = new SelectComponent();

      for (let i = 0; i < columnOptionList.length; i++) {
        this.createSelectComponent = this.select.createSelect({
          list: columnOptionList[i],
          onSelectionChanged: (e) =>
            this.onFilterCriteriaChanged(keyValue[i].foreignKey, e.target.value),
          key: keyValue[i].key,
          value: keyValue[i].foreignKey,
          defaultOptionLabel: 'All',
        });

        this.filterBySpan = createElementComponent({
          elementType: 'span',
          text: `Filter by ${keyValue[i].columnName}: `,
        });

        this.selectList.push(this.createSelectComponent);

        target.append(this.filterBySpan, this.selectList[i]);
      }
    }

    onFilterOptionsChanged = ({ columnOptionList, keys }) => {
      for (let i = 0; i < columnOptionList.length; i++) {
        this.selectList[i] = this.select.updateSelect({
          select: this.selectList[i],
          options: columnOptionList[i],
          key: keys[i].keyColumn,
          value: keys[i].valueColumn,
          defaultOptionLabel: 'All',
        });
      }
    };
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

  class Modal {
    constructor({ headerContent = [], bodyContent = [], footerContent = [] }) {
      this.modalContainer = createElementComponent({ elementType: "div" });

      this.modal = createElementComponent({ elementType: "div" });

      this.modal.classList.add("hidden", "modal");

      this.closeBtn = createButton({ text: "\u2716", onClick: this.closeModal });
      this.closeBtn.classList.add("closeModalBtn");

      const header = createElementComponent({
        elementType: "div",
        elementId: "header",
      });

      const body = createElementComponent({
        elementType: "div",
        elementId: "body",
      });

      const footer = createElementComponent({
        elementType: "div",
        elementId: "footer",
      });

      headerContent.forEach((element) => header.append(element));
      bodyContent.forEach((element) => body.append(element));
      footerContent.forEach((element) => footer.append(element));

      header.append(this.closeBtn);

      this.modal.append(header, body, footer);
      this.modalContainer.append(this.modal);

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      });

      this.overlay = document.getElementById("overlay");
      this.overlay.classList.add("overlay", "hidden");
    }

    closeModal = () => {
      this.modal.classList.add("hidden");
      this.overlay.classList.add("hidden");
    };

    openModal = () => {
      this.modal.classList.remove("hidden");
      this.overlay.classList.remove("hidden");
    };
  }

  function createForm({
    onSubmit = null,
    props = [],
    formId = null,
    selectList = [],
  }) {
    const form = document.createElement("form");

    if (formId) {
      form.id = formId;
    }

    if (selectList.length > 0) {
      selectList.forEach((element) => {
        const div = createElementComponent({ elementType: "div" });
        div.classList.add("formFields");

        const selectLabel = document.createElement("label");
        selectLabel.textContent = element.labelName;
        selectLabel.htmlFor = element.select.id;
        div.append(selectLabel, element.select);
        form.append(div);
      });
    }

    props.forEach((prop) => {
      const div = createElementComponent({ elementType: "div" });
      div.classList.add("formFields");

      const propLabel = document.createElement("label");
      propLabel.textContent = prop.name;
      propLabel.htmlFor = prop.id;

      const propInput = document.createElement("input");
      propInput.type = prop.inputType;
      propInput.id = prop.id;
      propInput.name = prop.id;
      propInput.required = prop.isRequired;

      div.append(propLabel, propInput);
      form.append(div);
    });

    const submitBtn = createButton({
      text: "Submit",
      type: "submit",
    });

    form.append(submitBtn);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmit({ formData: form });
    });

    return form;
  }

  class CreateTaskUI {
    constructor({ containerId, onSubmit = null }) {
      this.onSubmit = onSubmit;

      const target = document.getElementById(containerId);

      this.form = createForm({
        onSubmit: onSubmit,
        props: [
          { id: "title", inputType: "text", name: "Title", isRequired: true },
        ],
      });

      const title = createElementComponent({
        elementType: "h1",
        text: "Create task",
      });

      this.modal = new Modal({
        headerContent: [title],
        bodyContent: [this.form],
      });

      const createBtn = createButton({
        text: "Create task",
        onClick: this.modal.openModal,
      });

      this.modal.modalContainer.append(createBtn);

      target.append(this.modal.modalContainer);
    }

    closeModal = () => {
      this.modal.closeModal();
    };
  }

  /** Handles the form, item is for pre-exsting data (eg. update) */
  function handleFormData({
    sendTheDataFunction = null,
    onDataSent = null,
    formData,
    item,
  }) {
    const formDataEntries = new FormData(formData);
    let obj = {};
    for (const [key, value] of formDataEntries.entries()) {
      obj[key] = value;
    }
    const toSend = item ? { ...item, ...obj } : obj;

    sendTheDataFunction(toSend).then(() => {
      onDataSent();
      formData.reset();
    });
  }

  class ViewTaskUI {
    constructor({ containerId, onSubmit = null, userAssignList = [] }) {
      this.onSubmit = onSubmit;
      this.userAssignList = userAssignList;

      const target = document.getElementById(containerId);

      const title = createElementComponent({
        elementType: "h1",
        text: "Assign user",
      });

      this.select = new SelectComponent();

      this.selectUser = this.select.createSelect({
        selectId: "user",
      });

      this.form = createForm({
        formId: "viewTaskForm",
        selectList: [
          {
            labelName: "Assign user",
            select: this.selectUser,
          },
        ],
        onSubmit: ({ formData }) => {
          this.onSubmit({ formData: formData, item: this.currentItem });
        },
      });

      this.modal = new Modal({
        headerContent: [title],
        bodyContent: [this.form],
      });

      target.append(this.modal.modalContainer);
    }

    onViewItem = (item) => {
      this.modal.openModal();
      this.currentItem = item;
    };

    closeView = () => {
      this.modal.closeModal();
    };

    onAssignUserListChanged = ({ assignUserList }) => {
      this.selectUser = this.select.updateSelect({
        select: this.selectUser,
        options: assignUserList,
        key: "id",
        value: "user",
        defaultOptionLabel: "Select a user",
      });
    };
  }

  function getPaginatedUsers(paginationDetails) {
    return fetch('http://localhost:5143/User/list/', {
      body: JSON.stringify(paginationDetails),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error('Error ' + response.status + ' ' + text);
        });
      }
      return response.json();
    });
  }

  function getPaginatedTasks(paginationDetails) {
    return fetch('http://localhost:5143/Task/list', {
      body: JSON.stringify(paginationDetails),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error('Error ' + response.status + ' ' + text);
        });
      }
      return response.json();
    });
  }

  function getAllStatuses() {
    return fetch('http://localhost:5143/Status/').then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error('Error ' + response.status + ' ' + text);
        });
      }
      return response.json();
    });
  }

  function getAllUsers() {
    return fetch('http://localhost:5143/User/').then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error('Error ' + response.status + ' ' + text);
        });
      }
      return response.json();
    });
  }

  function addUser(userToSave) {
    console.log(userToSave);
    return fetch('http://localhost:5143/User/', {
      body: JSON.stringify(userToSave),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error('Error ' + response.status + ' ' + text);
        });
      }
      return response.json();
    });
  }

  function addTask(taskToSave) {
    return fetch('http://localhost:5143/Task/', {
      body: JSON.stringify(taskToSave),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error('Error ' + response.status + ' ' + text);
        });
      }
      return response.json();
    });
  }

  class TaskLogic {
    constructor({ initialTaskData = [] } = {}) {
      this.taskService = new TaskService(initialTaskData);
      this.pagerData = new PagerData({});

      this.paginationHandler = new PaginationHandler({
        paginationFunction: getPaginatedTasks,
        onPaginationResponse: this.onPaginationResponse,
        pagerData: this.pagerData,
      });

      this.sortCriteriaHandler = new SortCriteriaHandler({
        onNotifyPaginationHandler: this.paginationHandler.onSortCriteriaChanged,
        columnList: ['title', 'creationDate'],
      });

      this.filterCriteriaHandler = new FilterCriteriaHandler({
        onNotifyPaginationHandler: this.paginationHandler.onFilterCriteriaChanged,
      });

      this.taskPresentationUI = new TaskPresentationUI({
        containerId: 'taskPaginationContainer',
        onViewClick: (item) => this.viewTaskUI.onViewItem(item),
      });

      const { setItemsPerPage, setCurrentPageNo } = this.pagerData;
      this.pagerComponentUI = new PagerComponentUI({
        containerId: 'taskPerPageSelect',
        onItemsPerPageChange: setItemsPerPage,
        onCurrentPageChange: setCurrentPageNo,
      });

      this.sortTaskControlUI = new SortControlUI({
        containerId: 'sortTaskContainer',
        onSortCriteriaChanged: this.sortCriteriaHandler.onSortCriteriaChanged,
        columnMap: this.sortCriteriaHandler.sortCriteriaInstances,
      });

      this.filterTaskControlUI = new FilterControlUI({
        containerId: 'filterTaskContainer',
        onFilterCriteriaChanged:
          this.filterCriteriaHandler.onFilterCriteriaChanged,
        columnOptionList: [taskStatus, initialUserData],
        keyValue: [
          { key: 'id', foreignKey: 'statusId', columnName: 'Status' },
          { key: 'id', foreignKey: 'userId', columnName: 'User' },
        ],
      });

      this.createTaskUI = new CreateTaskUI({
        containerId: 'createTaskContainer',
        onSubmit: ({ formData }) => {
          handleFormData({
            sendTheDataFunction: (item) =>
              addTask(item),
            onDataSent: () => {
              this.createTaskUI.closeModal();
              this.paginationHandler.getPaginatedItems();
            },
            formData,
          });
        },
      });

      this.viewTaskUI = new ViewTaskUI({
        containerId: 'viewTask',
        onSubmit: ({ formData, item }) => {
          handleFormData({
            sendTheDataFunction: (item) =>
              this.taskService.updateTask({ task: item }),
            onDataSent: () => {
              this.viewTaskUI.closeView();
              this.paginationHandler.getPaginatedItems();
            },
            formData,
            item,
          });
        },
      });
    }

    onPaginationResponse = ({ paginatedItems, totalPages, currentPageNo }) => {
      Promise.all([getAllStatuses(), getAllUsers()]).then(([statuses, users]) => {
        let statusMap = new Map(statuses.map((s) => [s.id, s.statusName]));
        let userMap = new Map(users.map((u) => [u.id, u.name]));

        this.taskPresentationUI.renderTasks({
          paginatedItems,
          userMap,
          statusMap,
        });
      });
      this.pagerComponentUI.updateSelect({ currentPageNo, totalPages });
    };

    onUserListChanged = ({ userList }) => {
      // this.userList = userList;
      // this.userMap = new Map(this.userList.map((user) => [user.id, user.user]));
      // this.viewTaskUI.onAssignUserListChanged({ assignUserList: this.userList });
      // this.filterTaskControlUI.onFilterOptionsChanged({
      //   columnOptionList: [taskStatus, this.userList],
      //   keyValue: [
      //     { key: 'id', foreignKey: 'statusId', columnName: 'Status' },
      //     { key: 'id', foreignKey: 'userId', columnName: 'User' },
      //   ],
      // });
    };

    init() {
      this.pagerData.init();
      Promise.all([getAllStatuses(), getAllUsers()]).then(([statuses, users]) => {
        let taskStatus = statuses.map((s) => ({
          id: s.id,
          status: s.statusName,
        }));
        let userData = users.map((u) => ({ id: u.id, user: u.name }));

        this.filterTaskControlUI.onFilterOptionsChanged({
          columnOptionList: [taskStatus, userData],
          keys: [
            { keyColumn: 'id', valueColumn: 'status' },
            { keyColumn: 'id', valueColumn: 'user' },
          ],
        });
      });
    }
    
  }

  class UserService {
    constructor(userData) {
      this.service = new DbService(userData);
    }

    saveUser({user}) {
      const id = generateGUID();
      user.id = id;
      return this.service.save({objToSave: user});
    }

    getPaginatedUsers = (
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

    sendEmail({userList}) {
      return new Promise((resolve) => {
        const infoList = userList.map((element) => {
          return `Sent mail to ${element.name} (${element.email})`;
        });
        resolve(infoList);
      });
    }

    getById(userId) {
      return this.service.findById(userId);
    }
  }

  function createCheckbox({ id = null, value = "", onChange = null}) {
    const element = document.createElement("input");
    element.type = "checkbox";
    element.value = value;
    element.id = id;
    element.addEventListener("change", onChange);

    return element;
  }

  function renderUsers({
    userList,
    containerId,
    onCheckboxChecked = null,
  }) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    userList.forEach((element) => {
      const card = createElementComponent({ elementType: "div" });
      card.classList.add("card", "user");

      const userCheckbox = createCheckbox({
        id: element.id,
        value: element.id,
        onChange: (e) =>
          onCheckboxChecked({
            id: e.target.value,
            name: element.user,
            email: element.email,
            isChecked: e.target.checked,
          }),
      });

      const nameInfo = createElementComponent({
        elementType: "h3",
        text: `${element.name}`,
      });

      const emailInfo = createElementComponent({
        elementType: "p",
        text: `Email: ${element.email}`,
      });

      const departmentInfo = createElementComponent({
        elementType: "p",
        text: `Department: ${element.department}`,
      });

      card.append(userCheckbox, nameInfo, emailInfo, departmentInfo);
      container.appendChild(card);
    });
    return userList;
  }

  class UserPresentationUI {
    constructor({ containerId, onCheckboxChecked = null }) {
      this.containerId = containerId;
      this.onCheckboxChecked = onCheckboxChecked;
    }

    renderUsers = ({ paginatedItems }) => {
      renderUsers({
        userList: paginatedItems,
        containerId: this.containerId,
        onCheckboxChecked: this.onCheckboxChecked,
      });
    };

    renderCheckedCheckboxes = ({ checkboxState }) => {
      for (const user of checkboxState.keys()) {
        const id = user.id;
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = checkboxState.get(id).isChecked;
        }
      }
    };
  }

  class SendEmailComponentUI {
    constructor({
      containerId,
      onUserListChanged = null,
      onUserListReceived = null,
    }) {
      this.onUserListChanged = onUserListChanged;
      const target = document.getElementById(containerId);
      this.onUserListReceived = onUserListReceived;

      this.sendEmailButton = createButton({
        text: "Send Email",
        onClick: () => {
          const idList = this.onUserListReceived();
          this.onUserListChanged({ idList: idList });
        },
      });

      target.append(this.sendEmailButton);
    }
  }

  class CheckboxHandler {
    constructor({ objectList = [], onCheckboxChanged }) {
      this.checkboxStateMap = new Map();
      for (const obj of objectList) {
        this.checkboxStateMap.set(obj.id, {
          name: obj.user,
          email: obj.email,
          isChecked: false,
        });
      }
      this.onCheckboxChanged = onCheckboxChanged;
    }

    onCheckboxChecked = ({
      id = null,
      name = "",
      email = "",
      isChecked = false,
    }) => {
      this.checkboxStateMap.set(id, { name, email, isChecked });
      this.onCheckboxChanged(this.checkboxStateMap);
    };

    getCheckedKeys = () => {
      return Array.from(this.checkboxStateMap.entries())
        .filter(([key, value]) => value.isChecked === true)
        .map((value) => value[1]);
    };
  }

  class SendEmailHandler {
    constructor({ sendEmailFunction = null, onSendEmailResponse = null }) {
      this.sendEmailFunction = sendEmailFunction;
      this.onSendEmailResponse = onSendEmailResponse;
    }

    sendEmail = ({ idList }) => {
      this.sendEmailFunction({ userList: idList }).then((userInfoList) => {
        this.onSendEmailResponse({ userInfoList });
      });
    };
  }

  class CheckboxCheckUI {
    renderCheckboxChecks = (checkboxStateMap) => {
      for (const id of checkboxStateMap.keys()) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          const details = checkboxStateMap.get(id);
          checkbox.checked = details.isChecked;
        }
      }
    };
  }

  class AddUserUI {
    constructor({ containerId, onSubmit }) {
      const target = document.getElementById(containerId);

      this.form = createForm({
        onSubmit: onSubmit,
        props: [
          { id: "name", inputType: "text", name: "Name", isRequired: true },
          { id: "email", inputType: "text", name: "Email", isRequired: true },
          {
            id: "department",
            inputType: "text",
            name: "Department",
            isRequired: false,
          },
          ,
        ],
      });

      const title = createElementComponent({
        elementType: "h1",
        text: "Add  user",
      });

      this.modal = new Modal({
        headerContent: [title],
        bodyContent: [this.form],
      });

      const createBtn = createButton({
        text: "Add new user",
        onClick: this.modal.openModal,
      });

      this.modal.modalContainer.append(createBtn);

      target.append(this.modal.modalContainer);
    }

    closeModal = () => {
      this.modal.closeModal();
    };
  }

  class UserLogic {
    constructor({ initialUserData = [], onUserListChanged = null }) {
      this.onUserListChanged = onUserListChanged;

      this.userService = new UserService(initialUserData);
      this.pagerData = new PagerData({});

      this.paginationHandler = new PaginationHandler({
        paginationFunction: getPaginatedUsers,
        onPaginationResponse: this.onPaginationResponse,
        pagerData: this.pagerData,
      });

      this.sendEmailHandler = new SendEmailHandler({
        sendEmailFunction: this.userService.sendEmail,
        onSendEmailResponse: this.onSendEmailResponse,
      });

      this.checkboxCheckUI = new CheckboxCheckUI();

      this.checkboxHandler = new CheckboxHandler({
        objectList: initialUserData,
        onCheckboxChanged: this.checkboxCheckUI.renderCheckboxChecks,
      });

      this.userPresentationUI = new UserPresentationUI({
        containerId: 'userContainer',
        onCheckboxChecked: this.checkboxHandler.onCheckboxChecked,
      });

      this.sendEmailComponentUI = new SendEmailComponentUI({
        containerId: 'sendEmailActionControl',
        onUserListChanged: this.sendEmailHandler.sendEmail,
        onUserListReceived: this.checkboxHandler.getCheckedKeys,
      });

      const { setItemsPerPage, setCurrentPageNo } = this.pagerData;

      this.pagerComponentUI = new PagerComponentUI({
        containerId: 'userPageControls',
        onItemsPerPageChange: setItemsPerPage,
        onCurrentPageChange: setCurrentPageNo,
      });

      this.AddUserUI = new AddUserUI({
        containerId: 'addUserContainer',
        onSubmit: ({ formData }) => {
          handleFormData({
            sendTheDataFunction: (item) =>
             addUser(item),
            onDataSent: () => {
              this.AddUserUI.closeModal();
              this.paginationHandler.getPaginatedItems();
              // this.onUserListChanged({
              //   userList: this.userService.service.objectList,
              // });
            },
            formData,
          });
        },
      });
    }

    onPaginationResponse = ({ paginatedItems, totalPages, currentPageNo }) => {
      this.userPresentationUI.renderUsers({ paginatedItems });

      this.pagerComponentUI.updateSelect({
        currentPageNo,
        totalPages,
      });

      this.checkboxCheckUI.renderCheckboxChecks(
        this.checkboxHandler.checkboxStateMap,
      );
    };

    onSendEmailResponse = ({ userInfoList }) => {
      userInfoList.forEach((message) => {
        console.log(message);
      });
    };

    init() {
      this.pagerData.init();
      getAllUsers().then((users) => {
        this.onUserListChanged({ userList: users });
        return users;
      });
    }
  }

  function setTheme({ theme }) {
    let themeValue = localStorage.getItem(theme);
    if (!themeValue) {
      themeValue = "0";
    }

    themeValue = ((parseInt(themeValue) + 1) % 2).toString();

    localStorage.setItem(theme, themeValue);

    getTheme({ theme });
  }

  function getTheme({ theme }) {
    const root = document.documentElement;
    let themeValue = localStorage.getItem(theme);
    switch (themeValue) {
      case "1":
        root.className = "dark";
        break;

      default:
        root.className = "light";
        break;
    }
  }

  class LighDarkControlUI {
    constructor({ containerId = null, onClick }) {
      const target = document.getElementById(containerId);
      const controlBtn = createButton({ text: "Change theme", onClick: onClick });

      getTheme({ theme: "isDark" });

      target.append(controlBtn);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new LighDarkControlUI({
      containerId: "lightDarkControl",
      onClick: () => setTheme({theme: "isDark"})
    });
    const taskLogic = new TaskLogic({ initialTaskData });
    taskLogic.init();
    const userLogic = new UserLogic({
      initialUserData,
      onUserListChanged: taskLogic.onUserListChanged,
    });
    userLogic.init();
  });

})();

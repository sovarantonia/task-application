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
  }

  class TaskService {
    constructor(taskData) {
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

    getTasks(
      { currentPage, itemsPerPage },
      sortCriteria = [],
      filterCriteria = [],
    ) {
      return this.service.getPaginatedItems(
        { currentPage, itemsPerPage },
        sortCriteria,
        filterCriteria,
      );
    }
  }

  function dateParser(value) {
    return new Date(value);
  }

  const initialUserData = [
    {
      id: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
      userName: "Alice Morgan",
      email: "alice.morgan@example.com",
      department: "Backend Development", 
    },
    {
      id: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624",
      userName: "Bob Daniels",
      email: "bob.daniels@example.com",
      department: "Frontend Development", 
    },
    {
      id: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d",
      userName: "Charlie Wu",
      email: "charlie.wu@example.com",
      department: "Database Engineering", 
    },
    {
      id: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721",
      userName: "Dana Kim",
      email: "dana.kim@example.com",
      department: "UX/UI Design", 
    },
    {
      id: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba",
      userName: "Eva Thompson",
      email: "eva.thompson@example.com",
      department: "Quality Assurance", 
    },
    {
      id: "4f2fd22d-74cc-40bb-9600-2e9e83f223db",
      userName: "Frank Ortega",
      email: "frank.ortega@example.com",
      department: "Project Management",
    },
    {
      id: "8ea1de6b-681b-4d47-a4f7-abc9c7e19e02",
      userName: "Grace Lee",
      email: "grace.lee@example.com",
      department: "Customer Support",
    },
    {
      id: "f8c2f610-08c3-42f6-bbde-f94fc53119ea",
      userName: "Henry Patel",
      email: "henry.patel@example.com",
      department: "IT Support",
    },
    {
      id: "bd23c62f-205b-44aa-8b63-d0bfb749d4b9",
      userName: "Isla Novak",
      email: "isla.novak@example.com",
      department: "Legal",
    },
    {
      id: "3e4a3c5f-f6c7-442b-8c17-ccdd75ef1b7e",
      userName: "Jack Reynolds",
      email: "jack.reynolds@example.com",
      department: "Operations",
    },
  ];

  function renderTasks(containerId) {
    const container = document.getElementById(containerId);

    return (tasks) => {
      container.innerHTML = "";

      tasks.forEach((element) => {
        const card = document.createElement("div");
        card.className = "task-card";
        card.innerHTML = `<h2>${element.title}</h2>
        <p>Status: ${element.status}</p>
        <p>${element.description}</p>
        <p>Assigned to: ${element.userName}</p>
        <p>Created at: ${element.creationDate}</p>`;
        container.appendChild(card);
      });
    };
  }

  class TaskLogic {
    constructor({
      taskService = null,
      pagerComponent = null,
      itemsPerPageSelector = null,
    } = {}) {
      this.taskService = taskService;

      itemsPerPageSelector.onChangeFunction = this.setItemsPerPage;
      this.currentPage = 1;
      this.itemsPerPage = 5;

      this.taskRenderer = renderTasks("paginationContainer");

      this.pager = pagerComponent;
    }

    setItemsPerPage = (itemNrPerPage) =>  {
      this.itemsPerPage = parseInt(itemNrPerPage);
      this.currentPage = 1;
      this.getPagination();
    }

    getPagination() {
      const paginationRequest = {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      };
      this.taskService
        .getTasks(paginationRequest)
        .then(({ paginatedItems, totalPages }) => {
          this.taskRenderer(paginatedItems);
          this.totalPages = totalPages;
          this.pager.renderPaginationResults({
            totalPages: totalPages,
            currentPage: this.currentPage,
          });
        });
    }

    onNext = () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      this.getPagination();
    };

    onPrevious = () => {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getPagination();
    };
  }

  class SelectComponent {
    constructor({ onChangeFunction = null, options = [] } = {}) {
      this.onChangeFunction = onChangeFunction;
      this.options = options;
      this.select = document.createElement("select");
    }

    renderSelect(containerId) {
      const container = document.getElementById(containerId);
      this.select.innerHTML = "";

      this.options.forEach((element) => {
        const opt = document.createElement("option");
        opt.value = element;
        opt.textContent = element;
        this.select.append(opt);
      });

      this.select.addEventListener("change", (e) => {
        this.onChangeFunction(e.target.value);
      });

      container.appendChild(this.select);
    }
  }

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
    
  }

  class PagerComponent {
    constructor({ onNext, onPrev } = {}) {
      this.onNext = onNext;
      this.onPrevious = onPrev;

      this.createElementComponent = new CreateElementComponent();
      this.container = this.createElementComponent.createDiv();

      this.previousBtn = this.createElementComponent.createButton({
        text: "Previous",
        eventToAdd: () => this.onPrevious?.(),
      });
      this.nextBtn = this.createElementComponent.createButton({
        text: "Next",
        eventToAdd: () => this.onNext?.(),
      });

      this.pageIndicator = this.createElementComponent.createSpan();

      this.container.append(this.previousBtn, this.pageIndicator, this.nextBtn);
    }

    renderPaginationResults({ totalPages, currentPage }) {
      this.pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
      this.previousBtn.disabled = currentPage <= 1;
      this.nextBtn.disabled = currentPage >= totalPages;
    }

    addContainer(containerId) {
      const target = document.getElementById(containerId);
      target.appendChild(this.container);
    }
  }

  function renderUsers(containerId) {
    const container = document.getElementById(containerId);
    const createElementComponent = new CreateElementComponent();

    return (users, eventToAdd = null) => {
      container.innerHTML = "";

      users.forEach((element) => {
        const card = createElementComponent.createDiv();
        card.className = "user-card";
        const checkbox = createElementComponent.createCheckbox({
          value: element.id,
          eventToAdd: (e) => {
            eventToAdd?.(e.target.value, e.target.checked);
          },
        });
        checkbox.id = element.id;
        const nameInfo = createElementComponent.createP(`${element.userName}`);
        const emailInfo = createElementComponent.createP(
          `Email: ${element.email}`,
        );
        const departmentInfo = createElementComponent.createP(
          `Department: ${element.department}`,
        );

        card.append(checkbox, nameInfo, emailInfo, departmentInfo);
        container.appendChild(card);
      });
    };
  }

  function getCheckboxesState(checkboxState) {
    for (const id of checkboxState.keys()) {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.checked = checkboxState.get(id);
      }
    }
  }

  class UserLogic {
    constructor({
      userService = null,
      pagerComponent = null,
      itemsPerPageSelector = null,
      checkboxSelectComponent = null,
    } = {}) {
      this.userService = userService;
      this.pagerComponent = pagerComponent;
      this.checkboxSelectComponent = checkboxSelectComponent;

      this.currentPage = 1;
      this.itemsPerPage = 5;

      itemsPerPageSelector.onChangeFunction = this.setItemsPerPage;

      this.userRenderer = renderUsers("userContainer");

      this.checkboxStateMap = new Map();
    }

    setItemsPerPage = (itemNrPerPage) => {
      this.itemsPerPage = parseInt(itemNrPerPage);
      this.currentPage = 1;
      this.getUsers();
    };

    getUsers() {
      this.userService
        .getPaginatedUsers({
          currentPage: this.currentPage,
          itemsPerPage: this.itemsPerPage,
        })
        .then(({ paginatedItems, totalPages }) => {
          this.userRenderer(paginatedItems, this.onSelect);
          this.totalPages = totalPages;
          this.pagerComponent.renderPaginationResults({
            totalPages: totalPages,
            currentPage: this.currentPage,
          });
          this.checkboxSelectComponent.renderSelectedItemNr(
            this.checkboxStateMap.size,
          );
          getCheckboxesState(this.checkboxStateMap);
        });
    }

    onNext = () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      this.getUsers();
    };

    onPrevious = () => {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getUsers();
    };

    onSelect = (userId, isChecked) => {
      isChecked
        ? this.checkboxStateMap.set(userId, isChecked)
        : this.checkboxStateMap.delete(userId);
      this.checkboxSelectComponent.renderSelectedItemNr(
        this.checkboxStateMap.size,
      );
    };

    onClick = () => {
      const promises = [];
      for (const id of this.checkboxStateMap.keys()) {
        promises.push(this.userService.getById(id));
      }

      Promise.all(promises)
        .then((userInfoList) => {
          return this.userService.sendEmail(userInfoList);
        })
        .then((messages) => {
        });
    };
  }

  class UserService {
    constructor(userData) {
      this.service = new DbService(userData);
    }

    getPaginatedUsers(
      { currentPage, itemsPerPage },
      sortCriteria = [],
      filterCriteria = [],
    ) {
      return this.service.getPaginatedItems(
        { currentPage, itemsPerPage },
        sortCriteria,
        filterCriteria,
      );
    }

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

  class CheckboxSelectComponent {
    constructor({ onClick = null } = {}) {
      this.onClick = onClick;
      this.createElementComponent = new CreateElementComponent();
      this.container = this.createElementComponent.createDiv();
      this.sendButton = this.createElementComponent.createButton({
        text: "Send email",
        eventToAdd: () => this.onClick?.(),
      });
      this.selectedItemNrSpan = this.createElementComponent.createSpan();
      this.container.append(this.selectedItemNrSpan, this.sendButton);
    }

    renderSelectedItemNr(selectedItemNr) {
      this.selectedItemNrSpan.innerText = `${selectedItemNr} user(s) selected`;
      this.selectedItemNrSpan.hidden = selectedItemNr <= 0;
      this.sendButton.disabled = selectedItemNr <= 0;
    }

    addContainer(containerId) {
      const target = document.getElementById(containerId);
      target.appendChild(this.container);
    }
  }

  class TaskPresentationService {
    constructor() {
      initialTaskData.forEach((task) => {
        dateParser(task.creationDate);
      });
      this.taskService = new TaskService(initialTaskData);
      this.pager = new PagerComponent();
      this.select = new SelectComponent();
      this.taskLogic = new TaskLogic({
        taskService: this.taskService,
        pagerComponent: this.pager,
        itemsPerPageSelector: this.select,
      });

      this.pager.onNext = this.taskLogic.onNext;
      this.pager.onPrevious = this.taskLogic.onPrevious;
      this.pager.addContainer("buttonContainer");

      this.select.options = [5, 10];
      this.select.renderSelect("itemsPerPageSelect");

      this.userService = new UserService(initialUserData);

      this.userPager = new PagerComponent();
      this.selectUserPerPage = new SelectComponent();
      this.checkboxSelectComponent = new CheckboxSelectComponent();

      this.userLogic = new UserLogic({
        userService: this.userService,
        pagerComponent: this.userPager,
        itemsPerPageSelector: this.selectUserPerPage,
        checkboxSelectComponent: this.checkboxSelectComponent,
      });

      this.userPager.onNext = this.userLogic.onNext;
      this.userPager.onPrevious = this.userLogic.onPrevious;
      this.userPager.addContainer("userPageControls");

      this.selectUserPerPage.options = [5, 10];
      this.selectUserPerPage.renderSelect("selectUsersPerPage");

      this.checkboxSelectComponent.onClick = this.userLogic.onClick;
      this.checkboxSelectComponent.addContainer("sendActionControl");

      // this.taskPage = new PaginationComponent(this.taskService);
      // this.sortTasksControl = new SortTasksControl(
      //   this.taskPage.sortingCriteria,
      //   this.taskPage.renderPage.bind(this.taskPage),
      // );
      // this.filterTasksControl = new FilterTasksControl(
      //   this.taskPage.filterCriteria,
      //   this.taskPage.renderPage.bind(this.taskPage),
      // );
    }

    init() {
      this.taskLogic.getPagination();
      this.userLogic.getUsers();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const taskPresentationService = new TaskPresentationService();
    taskPresentationService.init();
  });

})();

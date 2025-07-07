(function () {
  'use strict';

  const initialTaskData = [
    {
      id: "24ab0076-1acc-41c2-952e-ca889c8c7695",
      title: "Fix login bug",
      description: "Users cannot log in with correct credentials.",
      status: "In Progress",
      assignedUser: "alice123",
    },
    {
      id: "1e0a63a7-6445-4254-8d58-9d8b19ab72e3",
      title: "Add user profile page",
      description:
        "Create a page where users can update their personal information.",
      status: "To Do",
      assignedUser: "bob_dev",
    },
    {
      id: "6a274a51-94cc-4244-b0fd-cc232f61d671",
      title: "Optimize database queries",
      description:
        "Improve the performance of slow-loading pages by optimizing queries.",
      status: "Done",
      assignedUser: "charlie_q",
    },
    {
      id: "b6354a2b-2adf-4954-9fbe-61c783b89360",
      title: "Implement dark mode",
      description: "Add an option for users to toggle dark mode in settings.",
      status: "To Do",
      assignedUser: "dana_ui",
    },
    {
      id: "43b82409-8234-44cf-a4b3-8dc590a6df6b",
      title: "Write integration tests for user service",
      description:
        "Ensure critical user workflows are covered by integration tests.",
      status: "In Review",
      assignedUser: "eva_tester",
    },
    {
      id: "4c20f508-a24c-41ba-97ff-e34616d2c57c",
      title: "Fix password reset issue",
      description: "Reset link fails for accounts created before 2024.",
      status: "In Progress",
      assignedUser: "alice123",
    },
    {
      id: "41634150-0e26-4f2d-a62c-abadc417eaa4",
      title: "Redesign user profile UI",
      description: "Modernize the layout of the user profile page.",
      status: "In Progress",
      assignedUser: "bob_dev",
    },
    {
      id: "fcbbf209-17b9-4e41-a307-71235780de6e",
      title: "Add indexing to improve search speed",
      description: "Use PostgreSQL indexing to enhance filtering by title.",
      status: "To Do",
      assignedUser: "charlie_q",
    },
    {
      id: "abf36db4-4446-4404-a58e-6ca43bc1db22",
      title: "Add system-wide color theme toggle",
      description: "Support dynamic switching between themes.",
      status: "To Do",
      assignedUser: "dana_ui",
    },
    {
      id: "eff52628-aae3-4357-8857-6713c56f1f7e",
      title: "Refactor test suite structure",
      description: "Organize unit and integration tests into separate folders.",
      status: "In Progress",
      assignedUser: "eva_tester",
    },
    {
      id: "35f172b6-b462-4d37-91c2-91d3938321c2",
      title: "Fix login redirect bug",
      description: "Users stay on login page even after successful login.",
      status: "Done",
      assignedUser: "alice123",
    },
    {
      id: "5acef95d-1971-45cd-ae8f-c789cb256807",
      title: "Add avatar upload on profile page",
      description: "Users can upload and crop their profile picture.",
      status: "To Do",
      assignedUser: "bob_dev",
    },
    {
      id: "563a2664-bf68-43d7-9b3d-3899bf24bd08",
      title: "Clean up deprecated SQL queries",
      description: "Remove old joins and improve query structure.",
      status: "Done",
      assignedUser: "charlie_q",
    },
    {
      id: "95a896da-f3be-4f92-b60e-c5c390e1e4c4",
      title: "Improve dark mode contrast",
      description: "Adjust color palette for better accessibility in dark mode.",
      status: "In Progress",
      assignedUser: "dana_ui",
    },
    {
      id: "118763b8-6d69-4a7c-901e-c41fd97f1fde",
      title: "Test PDF export functionality",
      description: "Validate correctness of downloaded PDFs for shared notes.",
      status: "In Review",
      assignedUser: "eva_tester",
    },
    {
      id: "f98e4427-0c0c-4d83-9f00-1866f9683a47",
      title: "Fix session timeout bug",
      description: "Auto logout occurs prematurely after login.",
      status: "To Do",
      assignedUser: "alice123",
    },
    {
      id: "01734573-74cf-41e7-84e4-e0635529fbea",
      title: "Add contact information section",
      description: "Enable users to save multiple contact details.",
      status: "In Progress",
      assignedUser: "bob_dev",
    },
    {
      id: "b0c420d1-21d1-4431-a8af-0b43cf8732ef",
      title: "Analyze DB performance metrics",
      description: "Generate weekly reports on slow queries and memory usage.",
      status: "Done",
      assignedUser: "charlie_q",
    },
    {
      id: "25c76bc3-177e-4bc9-834a-5d15dfdde382",
      title: "Add auto dark mode using system preference",
      description: "Use media query to detect and apply user's OS theme.",
      status: "To Do",
      assignedUser: "dana_ui",
    },
    {
      id: "5ad61f51-d697-43b4-afad-e88538399827",
      title: "Expand test coverage for PDF module",
      description: "Cover edge cases and error handling in export logic.",
      status: "In Review",
      assignedUser: "eva_tester",
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

    getTasks({ currentPage, itemsPerPage }) {
      return this.service.getElements({ currentPage, itemsPerPage });
    }

    getTotalPages(itemsPerPage) {
      return this.service.getTotalPages(itemsPerPage);
    }
  }

  class Pagination {
    constructor(elementList) {
      this.list = elementList;
    }

    getPaginatedElements({ currentPage, itemsPerPage }) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      return this.list.slice(start, end);
    }

    getTotalPages(itemsPerPage) {
      return Math.ceil(this.list.length / itemsPerPage);
    }
  }

  class DbService {
    constructor(initialData) {
      this.objectList = initialData;
      this.pagination = new Pagination(initialData);
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

    getElements({ currentPage, itemsPerPage }) {
      return new Promise((resolve) => {
        const paginatedItems = this.pagination.getPaginatedElements({
          currentPage,
          itemsPerPage,
        });
        resolve(paginatedItems);
      });
    }

    getTotalPages(itemsPerPage) {
      return new Promise((resolve) => {
        resolve(this.pagination.getTotalPages(itemsPerPage));
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
    }

    init() {
      this.attachEvents();
      this.renderPage(1);
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
          this.renderPage(this.currentPage);
          this.renderPaginationControls();
        });
      });

      this.previousBtn.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
        this.currentPageSpan.innerText = this.currentPage.toString();
        this.renderPage(this.currentPage);
        this.renderPaginationControls();
      });

      this.nextBtn.addEventListener("click", () => {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }

        this.currentPageSpan.innerText = this.currentPage.toString();
        this.renderPage(this.currentPage);
        this.renderPaginationControls();
      });

      this.firstPageBtn.addEventListener("click", () => {
        this.currentPage = 1;
        this.renderPage(this.currentPage);
        this.renderPaginationControls();
      });

      this.lastPageBtn.addEventListener("click", () => {
        this.currentPage = this.totalPages;
        this.renderPage(this.currentPage);
        this.renderPaginationControls();
      });
    }

    renderPage(page) {
      this.container.innerHTML = "";
      this.taskService
        .getTasks({ currentPage: page, itemsPerPage: this.itemsPerPage })
        .then((taskList) => {
          taskList.forEach((element) => {
            const card = document.createElement("div");
            card.className = "task-card";
            card.innerHTML = `<h2>${element.title}</h2>
          <p>Status: ${element.status}</p>
          <p>${element.description}</p>
          <p>Assigned to: ${element.assignedUser}</p>`;
            this.container.appendChild(card);
          });

          this.currentPageSpan.innerText = this.currentPage.toString();
          this.renderPaginationControls();
        });
    }

    renderPaginationControls() {
      this.previousBtn.disabled = this.currentPage === 1;
      this.nextBtn.disabled = this.currentPage === this.totalPages;
      this.currentPageSpan.hidden =
        this.currentPage === 1 || this.currentPage === this.totalPages;
    }
  }

  const initialUserData = [
    { id: "c1a4d379-90c1-4e25-bbe2-9a413f0f2c67", name: "Alice Morgan" },
    { id: "e3b54b15-dbe5-4e2c-90a4-d215d7f8c624", name: "Bob Daniels" },
    { id: "21b8a8a1-bc79-4f91-bcc9-0fca7ad73d9d", name: "Charlie Wu" },
    { id: "a9d8d3d3-7c52-4cb4-8a1c-72595cb3e721", name: "Dana Kim" },
    { id: "cfed2f3a-7129-4af3-98c0-512e63a3f8ba", name: "Eva Thompson" },
    { id: "4f2fd22d-74cc-40bb-9600-2e9e83f223db", name: "Frank Ortega" },
    { id: "8ea1de6b-681b-4d47-a4f7-abc9c7e19e02", name: "Grace Lee" },
    { id: "f8c2f610-08c3-42f6-bbde-f94fc53119ea", name: "Henry Patel" },
    { id: "bd23c62f-205b-44aa-8b63-d0bfb749d4b9", name: "Isla Novak" },
    { id: "3e4a3c5f-f6c7-442b-8c17-ccdd75ef1b7e", name: "Jack Reynolds" },
  ];

  const TaskStatus = {
    TODO: "To Do"};

  class CreateTaskModal {
    constructor(taskService) {
      this.openCreateModalBtn = document.getElementById("openCreateModalBtn");
      this.modal = document.getElementById("createTaskModal");
      this.closeModalBtn = document.getElementById("closeModalBtn");
      this.submitCreateTaskBtn = document.getElementById("submitCreateTaskBtn");
      this.form = document.getElementById("createTaskForm");
      this.titleInput = document.getElementById("titleInput");
      this.descriptionInput = document.getElementById("descriptionInput");
      this.userSelect = document.getElementById("userSelect");
      this.submitCreateTaskBtn = document.getElementById("submitCreateTaskBtn");

      this.modal.style.display = "none";

      this.taskService = taskService;
    }

    init() {
      this.populateUserSelect();
      this.actions();
    }

    populateUserSelect() {
      this.userSelect.innerHTML = "";
      initialUserData.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.text = user.name;
        this.userSelect.add(option);
      });
    }

    actions() {
      this.openCreateModalBtn.addEventListener("click", () => {
        this.modal.style.display = "block";
      });

      this.closeModalBtn.addEventListener("click", () => {
        this.modal.style.display = "none";
        this.form.reset();
      });

      this.userSelect.addEventListener("change", (e) => {
        this.userSelect.value = e.target.value;
      });

      this.submitCreateTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const selectedOption =
          this.userSelect.options[this.userSelect.selectedIndex];
        const assignedUserName = selectedOption.text;

        const newTask = {
          title: this.titleInput.value,
          description: this.descriptionInput.value,
          assignedUser: assignedUserName,
          status: TaskStatus.TODO,
        };

        this.taskService.saveTask(newTask).then((savedTask) => {
          this.modal.style.display = "none";
          console.log("Saved task: ", savedTask);
          this.form.reset();
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const dbService = new DbService(initialTaskData);
    const taskService = new TaskService(dbService);

    const taskPage = new TaskPage(taskService);
    taskPage.init();

    const createTaskModal = new CreateTaskModal(taskService);
    createTaskModal.init();
  });

})();

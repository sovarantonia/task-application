(function () {
  'use strict';

  const initialData = [
    {
      "id": 1,
      "title": "Fix login bug",
      "description": "Users cannot log in with correct credentials.",
      "status": "In Progress",
      "assignedUser": "alice123"
    },
    {
      "id": 2,
      "title": "Add user profile page",
      "description": "Create a page where users can update their personal information.",
      "status": "To Do",
      "assignedUser": "bob_dev"
    },
    {
      "id": 3,
      "title": "Optimize database queries",
      "description": "Improve the performance of slow-loading pages by optimizing queries.",
      "status": "Done",
      "assignedUser": "charlie_q"
    },
    {
      "id": 4,
      "title": "Implement dark mode",
      "description": "Add an option for users to toggle dark mode in settings.",
      "status": "To Do",
      "assignedUser": "dana_ui"
    },
    {
      "id": 5,
      "title": "Write unit tests for note service",
      "description": "Ensure 80%+ test coverage for the note-related backend logic.",
      "status": "In Review",
      "assignedUser": "eva_tester"
    },
    {
      "id": 6,
      "title": "Fix login bug",
      "description": "Users cannot log in with correct credentials.",
      "status": "In Progress",
      "assignedUser": "alice123"
    },
    {
      "id": 7,
      "title": "Add user profile page",
      "description": "Create a page where users can update their personal information.",
      "status": "To Do",
      "assignedUser": "bob_dev"
    },
    {
      "id": 8,
      "title": "Optimize database queries",
      "description": "Improve the performance of slow-loading pages by optimizing queries.",
      "status": "Done",
      "assignedUser": "charlie_q"
    },
    {
      "id": 9,
      "title": "Implement dark mode",
      "description": "Add an option for users to toggle dark mode in settings.",
      "status": "To Do",
      "assignedUser": "dana_ui"
    },
    {
      "id": 10,
      "title": "Write unit tests for note service",
      "description": "Ensure 80%+ test coverage for the note-related backend logic.",
      "status": "In Review",
      "assignedUser": "eva_tester"
    },
    {
      "id": 11,
      "title": "Fix login bug",
      "description": "Users cannot log in with correct credentials.",
      "status": "In Progress",
      "assignedUser": "alice123"
    },
    {
      "id": 12,
      "title": "Add user profile page",
      "description": "Create a page where users can update their personal information.",
      "status": "To Do",
      "assignedUser": "bob_dev"
    },
    {
      "id": 13,
      "title": "Optimize database queries",
      "description": "Improve the performance of slow-loading pages by optimizing queries.",
      "status": "Done",
      "assignedUser": "charlie_q"
    },
    {
      "id": 14,
      "title": "Implement dark mode",
      "description": "Add an option for users to toggle dark mode in settings.",
      "status": "To Do",
      "assignedUser": "dana_ui"
    },
    {
      "id": 15,
      "title": "Write unit tests for note service",
      "description": "Ensure 80%+ test coverage for the note-related backend logic.",
      "status": "In Review",
      "assignedUser": "eva_tester"
    },
    {
      "id": 16,
      "title": "Fix login bug",
      "description": "Users cannot log in with correct credentials.",
      "status": "In Progress",
      "assignedUser": "alice123"
    },
    {
      "id": 17,
      "title": "Add user profile page",
      "description": "Create a page where users can update their personal information.",
      "status": "To Do",
      "assignedUser": "bob_dev"
    },
    {
      "id": 18,
      "title": "Optimize database queries",
      "description": "Improve the performance of slow-loading pages by optimizing queries.",
      "status": "Done",
      "assignedUser": "charlie_q"
    },
    {
      "id": 19,
      "title": "Implement dark mode",
      "description": "Add an option for users to toggle dark mode in settings.",
      "status": "To Do",
      "assignedUser": "dana_ui"
    },
    {
      "id": 20,
      "title": "Write unit tests for note service",
      "description": "Ensure 80%+ test coverage for the note-related backend logic.",
      "status": "In Review",
      "assignedUser": "eva_tester"
    }
  ];

  class LoadData {
     
      loadData() {
          return new Promise((resolve) => {
             resolve(initialData);
          })
      }
  }

  class Task {
      constructor(id, title, description, status, assignedUser) {
          this.id = id;
          this.title = title;
          this.description = description;
          this.status = status;
          this.assignedUser = assignedUser;
      }
  }

  class TaskService {

      constructor() {
          this.tasks = initialData.map(task => new Task(task.id, task.title, task.description, task.status, task.assignedUser));
          this.nextId = this.tasks.length;
      }

      saveTask(title, description, status, assignedUser) {
          this.nextId++;
          const newTask = new Task(this.nextId, title, description, status, assignedUser);
          this.tasks.push(newTask);
      }

      getAllTasks() {
          return this.tasks;
      }

      getTaskById(id) {
          return this.tasks.at(id - 1); 
      }

      updateTask(id, title, description, status, assignedUser) {
          let taskToUpdate = this.tasks.at(id - 1);
          if (taskToUpdate == null) {
              throw "Task does not exist";
          }

          if (title !== undefined) {
              taskToUpdate.title = title;
          }

           if (description !== undefined) {
              taskToUpdate.description = description;
          }

           if (status !== undefined) {
              taskToUpdate.status = status;
          }

           if (assignedUser !== undefined) {
              taskToUpdate.assignedUser = assignedUser;
          }

          return taskToUpdate;
      }

      getPaginatedTasks({currentPage, itemsPerPage}) {
          const start = (currentPage - 1) * itemsPerPage;
          const end = start + itemsPerPage;

          return this.tasks.slice(start, end);
      }

      getTotalPages(itemsPerPage) {
          return Math.ceil(this.tasks.length / itemsPerPage);
      }



  }

  document.addEventListener("DOMContentLoaded", () => {
    const loader = new LoadData();

    loader.loadData()
      .then(data => {
        const taskService = new TaskService(data);
        const container = document.getElementById("taskContainer");
        const select = document.getElementById("itemsPerPageSelect");

        const previousBtn = document.getElementById("previousBtn");
        const nextBtn = document.getElementById("nextBtn");
        const currentPageSpan = document.getElementById("currentPageSpan");
        const firstPageBtn = document.getElementById("firstPageBtn");
        const lastPageBtn = document.getElementById("lastPageBtn");
          
        let currentPage = 1;
        let itemsPerPage = parseInt(select.value);
        let totalPages = taskService.getTotalPages(itemsPerPage);

        lastPageBtn.innerText = totalPages.toString();

        select.addEventListener("change", (e) => {
          itemsPerPage = parseInt(e.target.value);
          currentPage = 1;
          currentPageSpan.innerText = currentPage.toString();
          totalPages = taskService.getTotalPages(itemsPerPage);
          lastPageBtn.innerText = totalPages.toString();

          renderPage(currentPage);
          renderPaginationControls();
        });

        previousBtn.addEventListener("click", () => {
          if(currentPage > 1) {
            currentPage --;
          }
          currentPageSpan.innerText = currentPage.toString();
          renderPage(currentPage);
          renderPaginationControls();
        });

          
        nextBtn.addEventListener("click", () => {
          if(currentPage < totalPages) {
            currentPage ++;
          }
            
          currentPageSpan.innerText = currentPage.toString();
          renderPage(currentPage);
          renderPaginationControls();
        });

        firstPageBtn.addEventListener("click", () => {
          currentPage = 1;
          renderPage(currentPage);
          renderPaginationControls();
        });

        lastPageBtn.addEventListener("click", () => {
          currentPage = totalPages;
          renderPage(currentPage);
          renderPaginationControls();
        });

        function renderPage(page) {
          container.innerHTML = "";
          const paginatedTasks = taskService.getPaginatedTasks(page, itemsPerPage);

          paginatedTasks.forEach(element => {
            const card = document.createElement("div");
            card.className = "task-card";
            card.innerHTML = `<h2>${element.id}) ${element.title}</h2>
            <p>Status: ${element.status}</p>
            <p>${element.description}</p>
            <p>Assigned to: ${element.assignedUser}</p>`;
            container.appendChild(card);
          });
        }

        function renderPaginationControls() {
          previousBtn.disabled = currentPage === 1;
          nextBtn.disabled = currentPage === totalPages;
          currentPageSpan.hidden = currentPage === 1 || currentPage === totalPages;
        }
        currentPageSpan.innerText = currentPage.toString();

        renderPage(currentPage);
        renderPaginationControls();

      })
      
      .catch(err => console.error(err));
  });

})();

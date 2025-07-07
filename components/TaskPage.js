export class TaskPage {
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
          <p>Assigned to: ${element.assignedUser}</p>
          <p>Created at: ${element.creationDate}</p>`;
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

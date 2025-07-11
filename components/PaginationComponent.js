export class PaginationComponent {
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

    this.sortingCriteria = [];
    this.filterCriteria = [];
  }

  init() {
    this.attachEvents();
    this.renderPage();
  }

  attachEvents() {
    this.select.addEventListener("change", (e) => {
      this.itemsPerPage = parseInt(e.target.value);
      this.currentPage = 1;
      this.currentPageSpan.innerText = this.currentPage.toString();
      this.renderPage();
    });

    this.previousBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.currentPageSpan.innerText = this.currentPage.toString();
      this.renderPage();
    });

    this.nextBtn.addEventListener("click", () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }

      this.currentPageSpan.innerText = this.currentPage.toString();
      this.renderPage();
    });

    this.firstPageBtn.addEventListener("click", () => {
      this.currentPage = 1;
      this.renderPage();
    });

    this.lastPageBtn.addEventListener("click", () => {
      this.currentPage = this.totalPages;
      this.renderPage();
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

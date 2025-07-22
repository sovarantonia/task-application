export class PaginationComponent {
  constructor(taskService) {
    this.taskService = taskService;

    this.container = document.getElementById("taskContainer");
    this.select = document.getElementById("taskPerPageSelect");

    this.previousBtn = document.getElementById("previousBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.currentPageNoSpan = document.getElementById("currentPageNoSpan");
    this.firstPageBtn = document.getElementById("firstPageBtn");
    this.lastPageBtn = document.getElementById("lastPageBtn");

    this.currentPageNo = 1;
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
      this.currentPageNo = 1;
      this.currentPageNoSpan.innerText = this.currentPageNo.toString();
      this.renderPage();
    });

    this.previousBtn.addEventListener("click", () => {
      if (this.currentPageNo > 1) {
        this.currentPageNo--;
      }
      this.currentPageNoSpan.innerText = this.currentPageNo.toString();
      this.renderPage();
    });

    this.nextBtn.addEventListener("click", () => {
      if (this.currentPageNo < this.totalPages) {
        this.currentPageNo++;
      }

      this.currentPageNoSpan.innerText = this.currentPageNo.toString();
      this.renderPage();
    });

    this.firstPageBtn.addEventListener("click", () => {
      this.currentPageNo = 1;
      this.renderPage();
    });

    this.lastPageBtn.addEventListener("click", () => {
      this.currentPageNo = this.totalPages;
      this.renderPage();
    });
  }

  renderPage() {
    this.container.innerHTML = "";
    this.taskService
      .getTasks(
        { currentPageNo: this.currentPageNo, itemsPerPage: this.itemsPerPage },
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

        this.currentPageNoSpan.innerText = this.currentPageNo.toString();
        this.renderPaginationControls();
      });
  }

  renderPaginationControls() {
    this.lastPageBtn.hidden =
      this.firstPageBtn.innerText === this.lastPageBtn.innerText &&
      this.lastPageBtn.innerText === "1";
    this.previousBtn.disabled = this.currentPageNo === 1;
    this.nextBtn.disabled = this.currentPageNo === this.totalPages;
    this.currentPageNoSpan.hidden =
      this.currentPageNo === 1 || this.currentPageNo === this.totalPages;
  }
}

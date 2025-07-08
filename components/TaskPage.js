import { dateParser } from "../helpers/sortHelper";

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

    this.titleSortBtn = document.getElementById("titleSortBtn");
    this.dateSortBtn = document.getElementById("dateSortBtn");

    this.currentPage = 1;
    this.itemsPerPage = parseInt(this.select.value);
    this.taskService.getTotalPages(this.itemsPerPage).then((total) => {
      this.totalPages = total;
      this.lastPageBtn.innerText = total.toString();
    });

    this.sortingCriteria = [];
  }

  init() {
    this.attachEvents();
    this.renderPage(1, this.sortingCriteria);
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
        this.renderPage(this.currentPage, this.sortingCriteria);
        this.renderPaginationControls();
      });
    });

    this.previousBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.currentPageSpan.innerText = this.currentPage.toString();
      this.renderPage(this.currentPage, this.sortingCriteria);
      this.renderPaginationControls();
    });

    this.nextBtn.addEventListener("click", () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }

      this.currentPageSpan.innerText = this.currentPage.toString();
      this.renderPage(this.currentPage, this.sortingCriteria);
      this.renderPaginationControls();
    });

    this.firstPageBtn.addEventListener("click", () => {
      this.currentPage = 1;
      this.renderPage(this.currentPage, this.sortingCriteria);
      this.renderPaginationControls();
    });

    this.lastPageBtn.addEventListener("click", () => {
      this.currentPage = this.totalPages;
      this.renderPage(this.currentPage, this.sortingCriteria);
      this.renderPaginationControls();
    });

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

      debugger;
      this.renderPage(this.currentPage, this.sortingCriteria);
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
        transform: dateParser,
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

      this.renderPage(this.currentPage, this.sortingCriteria);
    });
  }

  renderPage(page, criteriaForSorting = []) {
    this.container.innerHTML = "";
    this.taskService
      .getTasks(
        { currentPage: page, itemsPerPage: this.itemsPerPage },
        criteriaForSorting,
      )
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

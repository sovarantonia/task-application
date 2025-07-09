import { dateParser } from "../helpers/sortHelper";
import { TaskStatus } from "../data/taskStatus";
import { initialUserData } from "../data/initialUserData";
import { getTotalPages } from "../service/Pagination";

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

    this.statusFilterSelect = document.getElementById("statusFilterSelect");
    this.userFilterSelect = document.getElementById("userFilterSelect");

    this.currentPage = 1;
    this.itemsPerPage = parseInt(this.select.value);
    this.taskService.getTotalPages(this.itemsPerPage).then((total) => {
      this.totalPages = total;
      this.lastPageBtn.innerText = total.toString();
    });

    this.sortingCriteria = [];
    this.filterCriteria = [];
  }

  init() {
    this.populateSelect();
    this.attachEvents();
    this.renderPage(1, this.sortingCriteria, this.filterCriteria);
    this.renderPaginationControls();
  }

  populateSelect() {
    this.userFilterSelect.innerHTML = "";
    const allUserOption = document.createElement("option");
    allUserOption.value = allUserOption.text = "All";
    this.userFilterSelect.add(allUserOption);

    initialUserData.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.text = user.userName;
      this.userFilterSelect.add(option);
    });

    const allStatusOption = document.createElement("option");
    allStatusOption.value = allStatusOption.text = "All";

    this.statusFilterSelect.innerHTML = "";
    this.statusFilterSelect.add(allStatusOption);

    TaskStatus.forEach((taskStatus) => {
      const option = document.createElement("option");
      option.value = taskStatus.id;
      option.text = taskStatus.status;
      this.statusFilterSelect.add(option);
    });
  }

  attachEvents() {
    this.select.addEventListener("change", (e) => {
      this.itemsPerPage = parseInt(e.target.value);
      this.currentPage = 1;
      this.currentPageSpan.innerText = this.currentPage.toString();

      this.taskService.getTotalPages(this.itemsPerPage).then((total) => {
        this.totalPages = total;
        this.lastPageBtn.innerText = total.toString();
        this.renderPage(
          this.currentPage,
          this.sortingCriteria,
          this.filterCriteria,
        );
        this.renderPaginationControls();
      });
    });

    this.previousBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.currentPageSpan.innerText = this.currentPage.toString();
      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
      this.renderPaginationControls();
    });

    this.nextBtn.addEventListener("click", () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }

      this.currentPageSpan.innerText = this.currentPage.toString();
      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
      this.renderPaginationControls();
    });

    this.firstPageBtn.addEventListener("click", () => {
      this.currentPage = 1;
      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
      this.renderPaginationControls();
    });

    this.lastPageBtn.addEventListener("click", () => {
      this.currentPage = this.totalPages;
      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
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

      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
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

      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
    });

    this.statusFilterSelect.addEventListener("change", (e) => {
      const statusFilterOption = {
        property: "status",
        value: e.target.value,
      };
      const elementIndex = this.filterCriteria.findIndex(
        (option) => option.property === "status",
      );
      if (elementIndex === -1) {
        if (e.target.value !== "All") {
          this.filterCriteria.push(statusFilterOption);
        }
      } else {
        if (e.target.value !== "All") {
          this.filterCriteria[elementIndex] = statusFilterOption;
        } else {
          this.filterCriteria.splice(elementIndex, 1);
        }
      }

      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
    });

    this.userFilterSelect.addEventListener("change", (e) => {
      const userFilterOption = {
        property: "userName",
        value: e.target.value,
      };
      const elementIndex = this.filterCriteria.findIndex(
        (option) => option.property === "userName",
      );
      if (elementIndex === -1) {
        if (e.target.value !== "All") {
          this.filterCriteria.push(userFilterOption);
        }
      } else {
        if (e.target.value !== "All") {
          this.filterCriteria[elementIndex] = userFilterOption;
        } else {
          this.filterCriteria.splice(elementIndex, 1);
        }
      }

      this.renderPage(
        this.currentPage,
        this.sortingCriteria,
        this.filterCriteria,
      );
    });
  }

  renderPage(page, criteriaForSorting = [], criteriaForFiltering = []) {
    this.container.innerHTML = "";
    this.taskService
      .getTasks(
        { currentPage: page, itemsPerPage: this.itemsPerPage },
        criteriaForSorting,
        criteriaForFiltering,
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
    if (
      this.firstPageBtn.innerText === this.lastPageBtn.innerText &&
      this.lastPageBtn.innerText === "1"
    ) {
      this.lastPageBtn.hidden = true;
    }
    else {
      this.lastPageBtn.hidden = false;
    }
    this.previousBtn.disabled = this.currentPage === 1;
    this.nextBtn.disabled = this.currentPage === this.totalPages;
    this.currentPageSpan.hidden =
      this.currentPage === 1 || this.currentPage === this.totalPages;
  }
}

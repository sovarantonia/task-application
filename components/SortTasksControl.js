export class SortTasksControl {
  constructor(sortingCriteria, renderPageFunction) {
    this.titleSortBtn = document.getElementById("titleSortBtn");
    this.dateSortBtn = document.getElementById("dateSortBtn");

    this.sortingCriteria = sortingCriteria;
    this.renderPage = renderPageFunction;
  }

  addEvents() {
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

      this.renderPage();
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

      this.renderPage();
    });
  }
}

import { updateCriteria } from "../helpers/updateCriteriaHelper";

export class SortTasksControl {
  constructor(sortingCriteria, renderPageFunction) {
    this.titleSortBtn = document.getElementById("titleSortBtn");
    this.dateSortBtn = document.getElementById("dateSortBtn");

    this.sortingCriteria = sortingCriteria;
    this.renderPage = renderPageFunction;
  }

  init() {
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

      updateCriteria({
        optionList: this.sortingCriteria,
        option: titleSortOption,
        removingCriteria: (opt) => opt.direction === 0,
      });

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

      updateCriteria({
        optionList: this.sortingCriteria,
        option: dateSortOption,
        removingCriteria: (opt) => opt.direction === 0,
      });

      this.renderPage();
    });
  }
}

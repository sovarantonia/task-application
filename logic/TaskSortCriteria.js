import { updateCriteria } from "../helpers/updateCriteriaHelper";

export class TaskSortCriteria {
  constructor(onSortCriteriaChanged = null) {
    this.sortCriteriaList = [];
    this.titleSortDirection = 0;
    this.dateSortDirection = 0;
    this.titleClickBtnCounter = 0;
    this.dateClickBtnCounter = 0;

    this.onSortCriteriaChanged = onSortCriteriaChanged;
  }

  setSortByTitleCriteria = () => {
    this.titleClickBtnCounter = (this.titleClickBtnCounter + 1) % 3;
    this.titleSortDirection = this.getSortDirection(this.titleClickBtnCounter);

    const titleSortOption = {
      property: "title",
      direction: this.titleSortDirection,
    };

    updateCriteria({
      optionList: this.sortCriteriaList,
      option: titleSortOption,
      removingCriteria: (opt) => opt.direction === 0,
    });

    this.onSortCriteriaChanged();
  };

  setSortByDateCriteria = () => {
    this.dateClickBtnCounter = (this.dateClickBtnCounter + 1) % 3;
    this.dateSortDirection = this.getSortDirection(this.dateClickBtnCounter);

    const dateSortOption = {
      property: "creationDate",
      direction: this.dateSortDirection,
    };

    updateCriteria({
      optionList: this.sortCriteriaList,
      option: dateSortOption,
      removingCriteria: (opt) => opt.direction === 0,
    });

    this.onSortCriteriaChanged();
  };

  getSortDirection(counter) {
    switch (counter) {
      case 1:
        return 1;
      case 2:
        return -1;
      default:
        return 0;
    }
  }
}

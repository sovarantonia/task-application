import { updateCriteria } from "../helpers/updateCriteriaHelper";

export class TaskSortCriteria {
  constructor(onSortCriteriaChanged = null) {
    this.sortCriteriaList = [];
    this.titleSortDirection = 0;
    this.dateSortDirection = 0;
    this.titleCounter = 0;
    this.dateCounter = 0;

    this.onSortCriteriaChanged = onSortCriteriaChanged;
  }

  setSortByTitleCriteria = () => {
    this.titleCounter = (this.titleCounter + 1) % 3;
    this.titleSortDirection = this.getSortDirection(this.titleCounter);

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
    this.dateCounter = (this.dateCounter + 1) % 3;
    this.dateSortDirection = this.getSortDirection(this.dateCounter);

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

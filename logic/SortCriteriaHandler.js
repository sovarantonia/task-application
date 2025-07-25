import { updateCriteria } from "../helpers/updateCriteriaHelper";
export class SortCriteriaHandler {
  constructor({onSortCriteriaListChange = null, sortCriteria = null} = {}) {
    this.sortCriteriaList = [];
    this.onSortCriteriaListChange = onSortCriteriaListChange;

    this.sortCriteria = sortCriteria;

    this.sortCriteria.onSortCriteriaCreated = () => this.setSortOption(this.sortCriteria.sortOption);
  }

  setSortOption = (option) => {
    updateCriteria({
      optionList: this.sortCriteriaList,
      option: option,
      removingCriteria: (opt) => opt.direction === 0,
    });

    this.onSortCriteriaListChange(); // pass this list to pagination handler
  }
}

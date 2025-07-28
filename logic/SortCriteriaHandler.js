import { SortCriteria } from "./SortCriteria";
export class SortCriteriaHandler {
  constructor({ onNotifyPaginationHandler = null } = {}) {
    this.sortCriteriaList = new Map();
    this.onNotifyPaginationHandler = onNotifyPaginationHandler;
  }

  setSortOption = (option) => {
    this.sortCriteriaList.set(option.property, option.direction);
    this.onNotifyPaginationHandler(this.sortCriteriaList); // pass this list to pagination handler
  };

  onSortCriteriaChanged = (column) => {
    let sortCriteria;
    !this.sortCriteriaList.has(column)
      ? (sortCriteria = new SortCriteria({
          propertyType: column,
          onSortCriteriaCreated: (option) => this.setSortOption(option),
        }))
      : (sortCriteria = new SortCriteria({
          propertyType: column,
          direction: this.sortCriteriaList.get(column),
          onSortCriteriaCreated: (option) => this.setSortOption(option),
        }));

    sortCriteria.setSortCriteria();
  };
}

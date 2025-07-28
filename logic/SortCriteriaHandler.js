import { updateCriteria } from "../helpers/updateCriteriaHelper";
import { SortCriteria } from "./SortCriteria";
export class SortCriteriaHandler {
  constructor({ onSortCriteriaListChanged = null } = {}) {
    this.sortCriteriaList = [];
    this.onSortCriteriaListChanged = onSortCriteriaListChanged;
  }

  setSortOption = (option) => {
    updateCriteria({
      optionList: this.sortCriteriaList,
      option: option,
      removingCriteria: (opt) => opt.direction === 0,
    });

    this.onSortCriteriaListChanged(this.sortCriteriaList); // pass this list to pagination handler
  };

  onSortCriteriaChanged = (column) => {
    const index = this.sortCriteriaList.findIndex((o) => o.property === column);
    let sortCriteria;
    index === -1
      ? (sortCriteria = new SortCriteria({
          propertyType: column,
          onSortCriteriaCreated: (option) => this.setSortOption(option),
        }))
      : (sortCriteria = new SortCriteria({
          propertyType: this.sortCriteriaList[index].property,
          direction: this.sortCriteriaList[index].direction,
          onSortCriteriaCreated: (option) => this.setSortOption(option),
        }));

    sortCriteria.setSortCriteria();
  };
}

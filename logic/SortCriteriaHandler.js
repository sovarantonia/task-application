import { SortCriteria } from "./SortCriteria";
export class SortCriteriaHandler {
  constructor({ onNotifyPaginationHandler = null, columnList = [] } = {}) {
    this.sortCriteriaList = new Map();
    for (let column of columnList) {
      this.sortCriteriaList.set(column,
        new SortCriteria({
          propertyType: column,
          onSortCriteriaCreated: (option) => this.setSortOption(option),
        }),
      );
    }
    this.onNotifyPaginationHandler = onNotifyPaginationHandler;
  }

  setSortOption = (option) => {
    this.sortCriteriaList.set(option.property, {
      direction: option.direction,
      priority: this.getMaxPriority() + 1,
    });
    const sortCriteria = this.sortCriteriaList
      .entries()
      .reduce((acc, [key, value]) => {
        // console.log(value.direction)

        if (value != 0) {
          acc.push({
            property: key,
            direction: value.direction,
            priority: value.priority,
          });
        }
        return acc;
      }, []);
    sortCriteria.sort((a, b) => b.priority - a.priority);
    console.log(sortCriteria);
    this.onNotifyPaginationHandler(sortCriteria); // pass this list to pagination handler
  };

  onSortCriteriaChanged = (column) => {
    // debugger;
    const sortCriteria = this.sortCriteriaList.get(column);

    sortCriteria.setSortCriteria();
  };

  getMaxPriority() {
    // debugger;
    const max = this.sortCriteriaList.entries().reduce((max, [key, value]) => {
      if (value.priority >= max) {
        max = value;
      }
      return max;
    }, 0);
    return max;

    // console.log(Math.max(this.sortCriteriaList.values().priority))
  }
}

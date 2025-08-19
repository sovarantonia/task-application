import { SortCriteria } from "./SortCriteria";
export class SortCriteriaHandler {
  constructor({ onNotifyPaginationHandler = null, columnList = [] } = {}) {
    this.sortCriteriaInstances = new Map();

    for (let column of columnList) {
      const sortCriteria = new SortCriteria({
        propertyType: column,
        direction: 0,
        priority: 0,
        onSortCriteriaCreated: (option) => this.setSortOption(option),
      });
      this.sortCriteriaInstances.set(column, sortCriteria);
    }

    this.lastPriority = 0;
    this.onNotifyPaginationHandler = onNotifyPaginationHandler;
  }

  setSortOption = (option) => {
    option.priority = ++this.lastPriority;
    const sortCriteria = this.sortCriteriaInstances
      .entries()
      .reduce((acc, [key, value]) => {
        const { direction, priority } = value.sortOption;
          acc.push({
            property: key,
            direction: direction,
            priority: priority,
          });
  
        return acc;
      }, [])
      .sort((a, b) => a.priority - b.priority);
    this.onNotifyPaginationHandler(sortCriteria);
  };

  onSortCriteriaChanged = (column) => {
    const sortCriteria = this.sortCriteriaInstances.get(column);
    sortCriteria.setSortCriteria();
  };
}

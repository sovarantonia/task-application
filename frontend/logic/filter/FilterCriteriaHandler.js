import { FilterCriteria } from "./FilterCriteria.js";

export class FilterCriteriaHandler {
  constructor({onNotifyPaginationHandler}) {
    this.onNotifyPaginationHandler = onNotifyPaginationHandler;

    this.filterCriteriaList = new Map();
  }

  setFilterOption = (option) => {
    this.filterCriteriaList.set(option.property, option.value);
    const filterCriteria = this.filterCriteriaList
      .entries()
      .reduce((acc, [key, value]) => {
        if (value !== "All") {
          acc.push({
            property: key,
            value: value,
          });
        }
        return acc;
      }, []);
    this.onNotifyPaginationHandler(filterCriteria);
  };

  onFilterCriteriaChanged = (column, newValue) => {
    const filterCriteria = new FilterCriteria({
      propertyType: column,
      onFilterCriteriaCreated: (option) => this.setFilterOption(option),
    });

    filterCriteria.setFilterCriteria(newValue);
  };
}

export class FilterCriteria {
  constructor({ propertyType, onFilterCriteriaCreated }) {
    this.filterOption = { property: propertyType, value: "All" };
    this.onFilterCriteriaCreated = onFilterCriteriaCreated;
  }

  setFilterCriteria = (newValue) => {
    this.filterOption.value = newValue;
    this.onFilterCriteriaCreated(this.filterOption);
  };
}

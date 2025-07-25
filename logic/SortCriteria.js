//** this creates the sorting criteria for the property propertyType */
export class SortCriteria {
  constructor({ propertyType, onSortCriteriaCreated } = {}) {
    this.propertyType = propertyType;
    this.clickCounter = 0;
    this.sortOption = { property: propertyType, direction: 0 };

    this.onSortCriteriaCreated = onSortCriteriaCreated;
  }

  setSortCriteria = () => {
    this.clickCounter = (this.clickCounter + 1) % 3;
    this.sortOption.direction = this.getSortDirection(this.clickCounter);
    // const propertySortOption = {
    //   property: this.propertyType,
    //   direction: this.sortDirection,
    // };

    this.onSortCriteriaCreated(this.sortOption); // sa adauge/modifice optiunea din sortare, functia va fi in sort handler
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

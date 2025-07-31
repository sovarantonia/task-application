//** this creates the sorting criteria for the property propertyType */
export class SortCriteria {
  constructor({ propertyType, direction = 0, priority = 0, onSortCriteriaCreated } = {}) {
    this.sortOption = { property: propertyType, direction: direction, priority: priority };

    this.onSortCriteriaCreated = onSortCriteriaCreated;
  }

  setSortCriteria = () => {
    this.sortOption.direction =
      this.sortOption.direction + 1 > 1 ? -1 : this.sortOption.direction + 1;

    this.onSortCriteriaCreated(this.sortOption); // pass this to sort handler
  };
}

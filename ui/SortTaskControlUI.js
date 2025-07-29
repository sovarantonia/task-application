import { CreateElementComponent } from "../components/CreateElementComponent";

export class SortTaskControlUI {
  constructor({ containerId, onSortCriteriaChanged, columnList = [] }) {
    this.onSortCriteriaChanged = onSortCriteriaChanged;

    this.createElementComponent = new CreateElementComponent(containerId);

    for (let column of columnList) {
      this.sortByColumnBtn = this.createElementComponent.createElement({
        elementType: "button",
        text: `Sort by ${column}`,
        eventToAdd: () => {
          this.onSortCriteriaChanged(column);
        },
      });
    }

    // this.titleArrow = this.createElementComponent.createSpan();
    // this.dateArrow = this.createElementComponent.createSpan();
  }

  // setTitleArrow(sortDirection) {
  //   switch (sortDirection) {
  //     case 1:
  //       this.titleArrow.textContent = "\u2191";
  //       break;
  //     case -1:
  //       this.titleArrow.textContent = "\u2193";
  //       break;
  //     default:
  //       this.titleArrow.textContent = "";
  //       break;
  //   }
  // }

  // setDateArrow(sortDirection) {
  //   switch (sortDirection) {
  //     case 1:
  //       this.dateArrow.textContent = "\u2191";
  //       break;
  //     case -1:
  //       this.dateArrow.textContent = "\u2193";
  //       break;
  //     default:
  //       this.dateArrow.textContent = "";
  //       break;
  //   }
  // }
}

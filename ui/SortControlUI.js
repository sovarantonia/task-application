import { CreateElementComponent } from "../components/CreateElementComponent";

export class SortControlUI {
  constructor({ containerId, onSortCriteriaChanged, columnList  }) {
    this.onSortCriteriaChanged = onSortCriteriaChanged;

    this.createElementComponent = new CreateElementComponent(containerId);

    for (let column of columnList.keys()) {
      this.sortByColumnBtn = this.createElementComponent.createElement({
        elementType: "button",
        text: `Sort by ${column}`,
        eventToAdd: () => {
          this.onSortCriteriaChanged(column);
          // debugger;
        },
      });
    }
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

}

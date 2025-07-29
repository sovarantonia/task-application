import { CreateElementComponent } from "../components/CreateElementComponent";

export class FilterTaskControlUI {
  constructor({ containerId, onFilterCriteriaChanged, columnOptionList }) {
    this.onFilterCriteriaChanged = onFilterCriteriaChanged;

    this.createElementComponent = new CreateElementComponent(containerId);

    for (let list of columnOptionList) {
      this.filterBySpan = this.createElementComponent.createElement({
        elementType: "span",
        text: `Filter by ${list["column"]}: `,
      });
      this.filterByColumnSelect = this.createElementComponent.createElement({
        elementType: "select",
        options: list["values"],
        eventToAdd: (e) =>
          this.onFilterCriteriaChanged(list["column"], e.target.value),
      });
    }
  }
}

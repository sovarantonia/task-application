import { CreateElementComponent } from "../components/CreateElementComponent";

export class FilterTaskControlUI {
  constructor({ containerId, onFilterCriteriaChanged, columnOptionList }) {
    this.onFilterCriteriaChanged = onFilterCriteriaChanged;

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    for (let list of columnOptionList) {
      this.filterBySpan = this.createElementComponent.createSpan(`Filter by ${list["column"]}: `)
      this.filterByColumnSelect = this.createElementComponent.createSelect({
        options: list["values"],
        eventToAdd: (e) =>
          this.onFilterCriteriaChanged(list["column"], e.target.value),
      });
      this.container.append(this.filterBySpan, this.filterByColumnSelect)
    }

    this.target = document.getElementById(containerId);
    this.target.append(this.container);
  }
}

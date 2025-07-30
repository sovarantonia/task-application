import { CreateElementComponent } from "../components/CreateElementComponent";
import { SelectComponent } from "../components/SelectComponent";

export class FilterControlUI {
  constructor({
    containerId,
    onFilterCriteriaChanged,
    columnOptionList = [],
    keyValue = [],
  }) {
    this.onFilterCriteriaChanged = onFilterCriteriaChanged;

    this.target = document.getElementById(containerId);

    this.createElementComponent = new CreateElementComponent(containerId);
    this.select = new SelectComponent();

    for (let i = 0; i < columnOptionList.length; i++) {
      this.createSelectComponent = this.select.createSelect({
        list: columnOptionList[i],
        onSelectionChanged: (e) =>
          this.onFilterCriteriaChanged(keyValue[i].value, e.target.value),
        key: keyValue[i].key,
        value: keyValue[i].value,
        defaultOptionLabel: "All"
      });
      this.filterBySpan = this.createElementComponent.createElement({
        elementType: "span",
        text: `Filter by ${keyValue[i].value}: `,
      });
      this.target.append(this.createSelectComponent);
    }
  }
}

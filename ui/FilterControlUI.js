import { createElementComponent } from "../components/createElementComponentFunction";
import { SelectComponent } from "../components/SelectComponent";

export class FilterControlUI {
  constructor({
    containerId,
    onFilterCriteriaChanged,
    columnOptionList = [],
    keyValue = [],
  }) {
    this.onFilterCriteriaChanged = onFilterCriteriaChanged;

    const target = document.getElementById(containerId);

    const select = new SelectComponent();

    for (let i = 0; i < columnOptionList.length; i++) {
      this.createSelectComponent = select.createSelect({
        list: columnOptionList[i],
        onSelectionChanged: (e) =>
          this.onFilterCriteriaChanged(keyValue[i].value, e.target.value),
        key: keyValue[i].key,
        value: keyValue[i].value,
        defaultOptionLabel: "All",
      });
      this.filterBySpan = createElementComponent({
        elementType: "span",
        text: `Filter by ${keyValue[i].value}: `,
      });

      target.append(this.filterBySpan, this.createSelectComponent);
    }
  }
}

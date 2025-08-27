import { createElementComponent } from '../components/CreateElementComponent.js';
import { SelectComponent } from '../components/SelectComponent.js';

export class FilterControlUI {
  constructor({
    containerId,
    onFilterCriteriaChanged,
    columnOptionList = [],
    keyValue = [],
  }) {
    this.onFilterCriteriaChanged = onFilterCriteriaChanged;

    const target = document.getElementById(containerId);

    this.selectList = [];

    this.select = new SelectComponent();

    for (let i = 0; i < columnOptionList.length; i++) {
      this.createSelectComponent = this.select.createSelect({
        list: columnOptionList[i],
        onSelectionChanged: (e) =>
          this.onFilterCriteriaChanged(keyValue[i].foreignKey, e.target.value),
        key: keyValue[i].key,
        value: keyValue[i].foreignKey,
        defaultOptionLabel: 'All',
      });

      this.filterBySpan = createElementComponent({
        elementType: 'span',
        text: `Filter by ${keyValue[i].columnName}: `,
      });

      this.selectList.push(this.createSelectComponent);

      target.append(this.filterBySpan, this.selectList[i]);
    }
  }

  onFilterOptionsChanged = ({ columnOptionList, keyValue }) => {
    for (let i = 0; i < columnOptionList.length; i++) {
      this.selectList[i] = this.select.updateSelect({
        select: this.selectList[i],
        options: columnOptionList[i],
        key: keyValue[i].key,
        value: keyValue[i].foreignKey,
        defaultOptionLabel: 'All',
      });
    }
  };
}

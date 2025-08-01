export class CheckboxHandler {
  constructor() {
    this.checkboxStateMap = new Map();
  }

  onCheckboxChecked = ({ id = null, isChecked = false }) => {
    this.checkboxStateMap.set(id, isChecked);
  };

  getCheckedKeys = () => {
    return Array.from(this.checkboxStateMap.entries())
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
  };
}

export class CheckboxHandler {
  constructor({ objectList = [] }) {
    this.checkboxStateMap = new Map();
    for (const obj of objectList) {
      this.checkboxStateMap.set(
        { id: obj.id, name: obj.user, email: obj.email },
        false,
      );
    }
  }

  onCheckboxChecked = ({
    id = null,
    name = "",
    email = "",
    isChecked = false,
  }) => {
    this.checkboxStateMap.set({ id, name, email }, isChecked);
  };

  getCheckedKeys = () => {
    return Array.from(this.checkboxStateMap.entries())
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
  };
}

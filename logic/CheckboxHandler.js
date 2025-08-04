export class CheckboxHandler {
  constructor({ objectList = [], onCheckboxChanged }) {
    this.checkboxStateMap = new Map();
    for (const obj of objectList) {
      this.checkboxStateMap.set(obj.id, {
        name: obj.user,
        email: obj.email,
        isChecked: false,
      });
    }
    this.onCheckboxChanged = onCheckboxChanged;
  }

  onCheckboxChecked = ({
    id = null,
    name = "",
    email = "",
    isChecked = false,
  }) => {
    this.checkboxStateMap.set(id, { name, email, isChecked });
    this.onCheckboxChanged(this.checkboxStateMap);
  };

  getCheckedKeys = () => {
    return Array.from(this.checkboxStateMap.entries())
      .filter(([key, value]) => value.isChecked === true)
      .map((value) => value[1]);
  };
}

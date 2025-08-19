export class CheckboxCheckUI {
  renderCheckboxChecks = (checkboxStateMap) => {
    for (const id of checkboxStateMap.keys()) {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        const details = checkboxStateMap.get(id);
        checkbox.checked = details.isChecked;
      }
    }
  };
}

export class SelectComponent {
  createSelect({
    list = [],
    onSelectionChanged = null,
    key = null,
    value = null,
    defaultOptionLabel = "",
  }) {
    const select = document.createElement("select");
    if (defaultOptionLabel) {
      select.append(this.getOption(defaultOptionLabel));
    }
    list.forEach((element) => {
      select.append(this.getOption(element, key, value));
    });

    select.addEventListener("change", onSelectionChanged);
    return select;
  }

  getOption(element, key = null, value = null) {
    const opt = document.createElement("option");
    opt.value = element;
    opt.textContent = element;
    if (key && value) {
      opt.value = element[key];
      opt.textContent = element[value];
    }
    return opt;
  }
}

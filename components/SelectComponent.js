export class SelectComponent {
  createSelect({
    list = [],
    onSelectionChanged = null,
    key = null,
    value = null,
    defaultOptionLabel = "",
    selectId = null,
  }) {
    this.select = document.createElement("select");

    if (selectId) {
      this.select.id = selectId;
      this.select.name = selectId;
    }

    if (defaultOptionLabel) {
      this.select.append(this.getOption(defaultOptionLabel));
    }
    list.forEach((element) => {
      this.select.append(this.getOption(element, key, value));
    });

    this.select.addEventListener("change", onSelectionChanged);
    return this.select;
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

  updateSelect({
    select,
    options = [],
    key = null,
    value = null,
    defaultOptionLabel = "",
  }) {
    let optionNo = select.options.length - 1;
    if (optionNo > 0) {
      for (let i = optionNo; i >= 0; i--) {
        select.remove(i);
      }
    }

    // if (defaultOptionLabel) {
    //   this.select.append(this.getOption(defaultOptionLabel));
    // }

    options.forEach((element) => {
      select.append(this.getOption(element, key, value));
    });

    return select;
  }
}

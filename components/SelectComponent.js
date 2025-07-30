export class SelectComponent {
  createSelect({
    list = [],
    onSelectionChanged = null,
    key = null,
    value = null,
  }) {
    const select = document.createElement("select");
    list.forEach((element) => {
      const opt = document.createElement("option");
      opt.value = element;
      opt.textContent = element;
      if (key && value) {
        opt.value = element[key];
        opt.textContent = element[value];
      }
      select.append(opt);
    });
    select.addEventListener("change", onSelectionChanged);
    return select;
  }
}

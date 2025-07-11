export class SelectComponent {
  constructor(onChangeFunction, options) {
    this.onChangeFunction = onChangeFunction;
    this.options = options;
    this.select = document.createElement("select");
  }

  renderSelect(containerId) {
    const container = document.getElementById(containerId);
    this.select.innerHTML = "";

    this.options.forEach((element) => {
      const opt = document.createElement("option");
      opt.value = element;
      opt.textContent = element;
      this.select.append(opt);
    });

    this.select.addEventListener("change", (e) => {
      this.onChangeFunction(e.target.value);
    });

    container.appendChild(this.select);
  }
}

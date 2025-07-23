export class CreateElementComponent {
  createDiv() {
    return document.createElement("div");
  }
  createButton({ text = "", eventToAdd = null } = {}) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", eventToAdd);
    return button;
  }

  createSpan(text = "") {
    const span = document.createElement("span");
    span.textContent = text;
    return span;
  }

  createCheckbox({ value = "", eventToAdd = null } = {}) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = value;
    checkbox.addEventListener("change", eventToAdd);
    return checkbox;
  }

  createP(text = "") {
    const p = document.createElement("p");
    p.innerText = text;
    return p;
  }

  createSelect({ options = [], eventToAdd = null } = {}) {
    const select = document.createElement("select");
    if (options.length > 0) {
      options.forEach((element) => {
        const opt = document.createElement("option");
        opt.value = element;
        opt.textContent = element;
        select.append(opt);
      });
      select.options[0].selected = true;
    }
    select.addEventListener("change", eventToAdd);
    return select;
  }
}

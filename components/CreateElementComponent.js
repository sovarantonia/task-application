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
  
}

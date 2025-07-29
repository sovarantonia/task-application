export class CreateElementComponent {
  constructor(containerId = null) {
    this.target = document.getElementById(containerId);
  }

  createElement({
    elementType = "",
    options = [],
    text = "",
    eventToAdd = null,
    inputType = "",
  } = {}) {
    let element = document.createElement(elementType);
    switch (elementType) {
      case "button":
        element.textContent = text;
        element.addEventListener("click", eventToAdd);
        break;

      case "span":
        element.textContent = text;
        break;

      case "div":
        break;

      case "select":
        if (options.length > 0) {
          options.forEach((e) => {
            const opt = document.createElement("option");
            opt.value = e;
            opt.textContent = e;
            element.append(opt);
          });
          element.options[0].selected = true;
        }
        element.addEventListener("change", eventToAdd);
        break;

      case "p":
        element.innerText = text;
        break;

      case "checkbox":
        // element = document.createElement("input");
        // element.type = "checkbox";
        // element.value = value;
        // element.addEventListener("change", eventToAdd);
        break;

      default:
        break;
    }
    this.target.append(element);

    return element;
  }
}

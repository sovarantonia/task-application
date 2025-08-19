export function createElementComponent({
  elementType = "",
  text = "",
  elementId = null,
}) {
  let element = document.createElement(elementType);
  if (elementId) {
    element.id = elementId;
  }

  switch (elementType) {
    case "span":
      element.textContent = text;
      break;

    case "p":
      element.innerText = text;
      break;

    case "h1":
      element.textContent = text;
      break;

    case "h2":
      element.textContent = text;
      break;

    case "h3":
      element.textContent = text;
      break;

    case "h4":
      element.textContent = text;
      break;

    case "h5":
      element.textContent = text;
      break;

    case "h6":
      element.textContent = text;
      break;

    default:
      break;
  }

  return element;
}

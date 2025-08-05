export function createButton({ text = "", onClick = null, type = null }) {
  const element = document.createElement("button");
  element.textContent = text;
  if (type) {
    element.type = type;
  }
  element.addEventListener("click", onClick);
  return element;
}

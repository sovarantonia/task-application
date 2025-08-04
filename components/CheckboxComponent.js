export function createCheckbox({ id = null, value = "", onChange = null }) {
  const element = document.createElement("input");
  element.type = "checkbox";
  element.value = value;
  element.id = id;
  element.addEventListener("change", onChange);

  return element;
}

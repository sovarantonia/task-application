import { createButton } from "./ButtonComponent.js";
import { createElementComponent } from "./CreateElementComponent.js";

export function createForm({
  onSubmit = null,
  props = [],
  formId = null,
  selectList = [],
}) {
  const form = document.createElement("form");

  if (formId) {
    form.id = formId;
  }

  if (selectList.length > 0) {
    selectList.forEach((element) => {
      const div = createElementComponent({ elementType: "div" });
      div.classList.add("formFields");

      const selectLabel = document.createElement("label");
      selectLabel.textContent = element.labelName;
      selectLabel.htmlFor = element.select.id;
      div.append(selectLabel, element.select);
      form.append(div);
    });
  }

  props.forEach((prop) => {
    const div = createElementComponent({ elementType: "div" });
    div.classList.add("formFields");

    const propLabel = document.createElement("label");
    propLabel.textContent = prop.name;
    propLabel.htmlFor = prop.id;

    const propInput = document.createElement("input");
    propInput.type = prop.inputType;
    propInput.id = prop.id;
    propInput.name = prop.id;
    propInput.required = prop.isRequired;

    div.append(propLabel, propInput);
    form.append(div);
  });

  const submitBtn = createButton({
    text: "Submit",
    type: "submit",
  });

  form.append(submitBtn);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit({ formData: form });
  });

  return form;
}

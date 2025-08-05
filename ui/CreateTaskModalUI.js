import { createButton } from "../components/ButtonComponent.js";
import { createElementComponent } from "../components/createElementComponent.js";
import { createForm } from "../components/FormComponent.js";

export class CreateTaskModalUI {
  constructor({ containerId, onSubmit = null }) {
    this.onSubmit = onSubmit;

    const target = document.getElementById(containerId);
    this.openModalBtn = createButton({
      text: "Create a task",
      onClick: this.openModal,
    });

    this.formContainer = createElementComponent({ elementType: "div" });
    this.formContainer.classList.add("hidden");

    this.form = createForm({
      onSubmit: onSubmit,
      props: [{ id: "title", inputType: "text", name: "Title" }],
      onClose: this.closeModal
    });

    this.formContainer.append(
     this.form,
    );

    target.append(this.openModalBtn, this.formContainer);
  }

  //probably these should be handled somewhere else

  openModal = () => {
    this.formContainer.classList.remove("hidden");
  };

  closeModal = () => {
    this.formContainer.classList.add("hidden");
  };
}

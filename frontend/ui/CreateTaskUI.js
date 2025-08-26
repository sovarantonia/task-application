import { Modal } from "../components/ModalComponent.js";
import { createForm } from "../components/FormComponent.js";
import { createButton } from "../components/ButtonComponent.js";
import { createElementComponent } from "../components/CreateElementComponent.js";
export class CreateTaskUI {
  constructor({ containerId, onSubmit = null }) {
    this.onSubmit = onSubmit;

    const target = document.getElementById(containerId);

    this.form = createForm({
      onSubmit: onSubmit,
      props: [
        { id: "title", inputType: "text", name: "Title", isRequired: true },
      ],
    });

    const title = createElementComponent({
      elementType: "h1",
      text: "Create task",
    });

    this.modal = new Modal({
      headerContent: [title],
      bodyContent: [this.form],
    });

    const createBtn = createButton({
      text: "Create task",
      onClick: this.modal.openModal,
    });

    this.modal.modalContainer.append(createBtn);

    target.append(this.modal.modalContainer);
  }

  closeModal = () => {
    this.modal.closeModal();
  };
}

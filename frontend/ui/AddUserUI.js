import { createButton } from "../components/ButtonComponent.js";
import { createElementComponent } from "../components/CreateElementComponent.js";
import { createForm } from "../components/FormComponent.js";
import { Modal } from "../components/ModalComponent.js";

export class AddUserUI {
  constructor({ containerId, onSubmit }) {
    const target = document.getElementById(containerId);

    this.form = createForm({
      onSubmit: onSubmit,
      props: [
        { id: "name", inputType: "text", name: "Name", isRequired: true },
        { id: "email", inputType: "text", name: "Email", isRequired: true },
        {
          id: "department",
          inputType: "text",
          name: "Department",
          isRequired: false,
        },
        ,
      ],
    });

    const title = createElementComponent({
      elementType: "h1",
      text: "Add  user",
    });

    this.modal = new Modal({
      headerContent: [title],
      bodyContent: [this.form],
    });

    const createBtn = createButton({
      text: "Add new user",
      onClick: this.modal.openModal,
    });

    this.modal.modalContainer.append(createBtn);

    target.append(this.modal.modalContainer);
  }

  closeModal = () => {
    this.modal.closeModal();
  };
}

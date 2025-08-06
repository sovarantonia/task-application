import { createElementComponent } from "../components/createElementComponent.js";
import { Modal } from "../components/ModalComponent.js";
import { createForm } from "../components/FormComponent.js";

export class CreateTaskModalUI {
  constructor({ containerId, onSubmit = null }) {
    this.onSubmit = onSubmit;

    const target = document.getElementById(containerId);

    this.form = createForm({
      onSubmit: onSubmit,
      props: [
        { id: "title", inputType: "text", name: "Title", isRequired: true },
      ],
    });

    const title = createElementComponent({elementType: "h1", text: "Create task"})

    const modal = new Modal({openModalBtnText: "Create task", headerContent: [title], bodyContent: [this.form] });

    target.append(modal.modalContainer);
  }

}

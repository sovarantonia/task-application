import { createElementComponent } from "../components/createElementComponent.js";
import { createForm } from "../components/FormComponent.js";
import { Modal } from "../components/ModalComponent.js";
import { SelectComponent } from "../components/SelectComponent.js";
import { initialUserData } from "../data/initialUserData.js";
export class ViewTaskUI {
  constructor({ containerId, onSubmit = null }) {
    this.onSubmit = onSubmit;

    const target = document.getElementById(containerId);

    const title = createElementComponent({
      elementType: "h1",
      text: "Edit task",
    });

    const select = new SelectComponent();

    this.selectUser = select.createSelect({
      list: initialUserData,
      key: "id",
      value: "user",
      defaultOptionLabel: "Select a user",
      selectId: "user",
    });

    this.form = createForm({
      formId: "viewTaskForm",
      selectList: [
        {
          labelName: "Assign user",
          select: this.selectUser,
        },
      ],
      onSubmit: ({ formData }) => {
        this.onSubmit({ formData: formData, item: this.currentItem });
      },
    });

    this.modal = new Modal({
      headerContent: [title],
      bodyContent: [this.form],
    });

    target.append(this.modal.modalContainer);
  }

  onViewItem = (item) => {
    this.modal.openModal();
    this.currentItem = item;
  };

  closeView = () => {
    this.modal.closeModal();
  };
}

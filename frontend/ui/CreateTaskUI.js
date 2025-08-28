import { Modal } from '../components/ModalComponent.js';
import { createForm } from '../components/FormComponent.js';
import { createButton } from '../components/ButtonComponent.js';
import { createElementComponent } from '../components/CreateElementComponent.js';
import { SelectComponent } from '../components/SelectComponent.js';
export class CreateTaskUI {
  constructor({ containerId, onSubmit = null}) {
    this.onSubmit = onSubmit;

    const target = document.getElementById(containerId);

    this.select = new SelectComponent();

    this.selectUser = this.select.createSelect({
      selectId: 'userId',
    });

    this.form = createForm({
      onSubmit: onSubmit,
      props: [
        { id: 'title', inputType: 'text', name: 'Title', isRequired: true },
      ],
      selectList: [
        {
          labelName: 'Assign user',
          select: this.selectUser,
        },
      ],
    });

    const title = createElementComponent({
      elementType: 'h1',
      text: 'Create task',
    });

    this.modal = new Modal({
      headerContent: [title],
      bodyContent: [this.form],
    });

    const createBtn = createButton({
      text: 'Create task',
      onClick: this.modal.openModal,
    });

    this.modal.modalContainer.append(createBtn);

    target.append(this.modal.modalContainer);
  }

  onAssignUserListChanged = ({ assignUserList }) => {
    this.selectUser = this.select.updateSelect({
      select: this.selectUser,
      options: assignUserList,
      key: 'id',
      value: 'user',
      defaultOptionLabel: 'Select a user',
    });
  };

  closeModal = () => {
    this.modal.closeModal();
  };
}

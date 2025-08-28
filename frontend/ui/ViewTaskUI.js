import { createElementComponent } from '../components/CreateElementComponent.js';
import { createForm } from '../components/FormComponent.js';
import { Modal } from '../components/ModalComponent.js';
import { SelectComponent } from '../components/SelectComponent.js';
export class ViewTaskUI {
  constructor({ containerId, onSubmit = null, userAssignList = [] }) {
    this.onSubmit = onSubmit;
    this.userAssignList = userAssignList;

    const target = document.getElementById(containerId);

    const title = createElementComponent({
      elementType: 'h1',
      text: 'Assign user',
    });

    this.select = new SelectComponent();

    this.selectUser = this.select.createSelect({
      selectId: 'userId',
    });

    this.form = createForm({
      formId: 'viewTaskForm',
      selectList: [
        {
          labelName: 'Assign user',
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

  onAssignUserListChanged = ({ assignUserList }) => {
    this.selectUser = this.select.updateSelect({
      select: this.selectUser,
      options: assignUserList,
      key: 'id',
      value: 'user',
      defaultOptionLabel: 'Select a user',
    });
  };
}

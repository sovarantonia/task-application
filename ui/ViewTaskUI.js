import { createElementComponent } from "../components/createElementComponent.js";
import { Modal } from "../components/ModalComponent.js";
export class ViewTaskUI {
  constructor({containerId, onSubmit = null }) {
    this.onSubmit = onSubmit;

    const target = document.getElementById(containerId)

    const title = createElementComponent({
      elementType: "h1",
      text: "Edit task",
    });

    this.modal = new Modal({ openModalBtnText: "View task", headerContent : [title], });
  }

  onViewItem = ({item}) => {
    console.log(item);
  }
}

import { createButton } from "./ButtonComponent.js";
import { createElementComponent } from "./createElementComponent.js";

export class Modal {
  constructor({
    openModalBtnText = "",
    headerContent = [],
    bodyContent = [],
    footerContent = [],
  }) {
    this.modalContainer = createElementComponent({ elementType: "div" });

    this.openModalBtn = createButton({
      text: openModalBtnText,
      onClick: this.openModal,
    });

    this.modal = createElementComponent({ elementType: "div" });

    this.modal.classList.add("hidden", "modal");

    this.closeBtn = createButton({ text: "Close", onClick: this.closeModal });

    const header = createElementComponent({
      elementType: "div",
      elementId: "header",
    });

    const body = createElementComponent({
      elementType: "div",
      elementId: "body",
    });

    const footer = createElementComponent({
      elementType: "div",
      elementId: "footer",
    });

    headerContent.forEach((element) => header.append(element));
    bodyContent.forEach((element) => body.append(element));
    footerContent.forEach((element) => footer.append(element));

    header.append(this.closeBtn);

    this.modal.append(header, body, footer, this.closeBtn);
    this.modalContainer.append(this.openModalBtn, this.modal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }

  closeModal = () => {
    this.modal.classList.add("hidden");
  };

  openModal = () => {
    this.modal.classList.remove("hidden");
  };
}

import { createButton } from "./ButtonComponent.js";
import { createElementComponent } from "./CreateElementComponent.js";

export class Modal {
  constructor({ headerContent = [], bodyContent = [], footerContent = [] }) {
    this.modalContainer = createElementComponent({ elementType: "div" });

    this.modal = createElementComponent({ elementType: "div" });

    this.modal.classList.add("hidden", "modal");

    this.closeBtn = createButton({ text: "\u2716", onClick: this.closeModal });
    this.closeBtn.classList.add("closeModalBtn");

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

    this.modal.append(header, body, footer);
    this.modalContainer.append(this.modal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });

    this.overlay = document.getElementById("overlay");
    this.overlay.classList.add("overlay", "hidden");
  }

  closeModal = () => {
    this.modal.classList.add("hidden");
    this.overlay.classList.add("hidden");
  };

  openModal = () => {
    this.modal.classList.remove("hidden");
    this.overlay.classList.remove("hidden");
  };
}

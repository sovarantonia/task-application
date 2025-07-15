import { CreateElementComponent } from "./CreateElementComponent";

export class PagerComponent {
  constructor({ onNext, onPrev } = {}) {
    this.onNext = onNext;
    this.onPrevious = onPrev;

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    this.previousBtn = this.createElementComponent.createButton({
      text: "Previous",
      eventToAdd: () => this.onPrevious?.(),
    });
    this.nextBtn = this.createElementComponent.createButton({
      text: "Next",
      eventToAdd: () => this.onNext?.(),
    });

    this.pageIndicator = this.createElementComponent.createSpan();

    this.container.append(this.previousBtn, this.pageIndicator, this.nextBtn);
  }

  renderPaginationResults({ totalPages, currentPage }) {
    this.pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    this.previousBtn.disabled = currentPage <= 1;
    this.nextBtn.disabled = currentPage >= totalPages;
  }

  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
  }
}

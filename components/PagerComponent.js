export class PagerComponent {
  constructor({ onNext, onPrev } = {}) {
    this.onNext = onNext;
    this.onPrevious = onPrev;

    this.container = document.createElement("div");

    this.previousBtn = document.createElement("button");
    this.previousBtn.textContent = "Previous";

    this.nextBtn = document.createElement("button");
    this.nextBtn.textContent = "Next";

    this.pageIndicator = document.createElement("span");

    this.container.append(this.previousBtn, this.pageIndicator, this.nextBtn);
    this.init();
  }

  init() {
    this.previousBtn.addEventListener("click", () => this.onPrevious?.());
    this.nextBtn.addEventListener("click", () => this.onNext?.());
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

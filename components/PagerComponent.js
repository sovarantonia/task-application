import { PagerData } from "../logic/PagerData";
import { CreateElementComponent } from "./CreateElementComponent";

export class PagerComponent {
  constructor({ selectOptions } = {}) {
    // this.onNext = onNext;
    // this.onPrevious = onPrev;
    // this.pagerData = new PagerData();

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    // this.selectItemsPerPage = this.createElementComponent.createSelect({
    //   options: selectOptions,
    //   eventToAdd: (e) => this.pagerData.setItemsPerPage(e.target.value),
    // });

    // this.container.append(this.selectItemsPerPage);
  }

  // renderPaginationResults({ totalPages, currentPageNo, result, renderFunction }) {

  // this.previousBtn = this.createElementComponent.createButton({
  //   text: "Previous",
  //   eventToAdd: () => this.onPrevious?.(),
  // });
  // this.nextBtn = this.createElementComponent.createButton({
  //   text: "Next",
  //   eventToAdd: () => this.onNext?.(),
  // });
  // just put these here, they belong somwhere else
  //   renderFunction(result)
  //   this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
  //   this.previousBtn.disabled = currentPageNo <= 1;
  //   this.nextBtn.disabled = currentPageNo >= totalPages;
  // }

  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
  }
}

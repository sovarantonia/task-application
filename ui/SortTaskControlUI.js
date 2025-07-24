import { CreateElementComponent } from "../components/CreateElementComponent";

export class SortTaskControlUI {
  constructor({
    containerId,
    onSortByTitleCriteriaChanged = null,
    onSortByDateCriteriaChanged = null,
  }) {
    this.onSortByTitleCriteriaChanged = onSortByTitleCriteriaChanged;
    this.onSortByDateCriteriaChanged = onSortByDateCriteriaChanged;

    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();

    this.sortByTitleBtn = this.createElementComponent.createButton({
      text: "Sort by title",
      eventToAdd: () => this.onSortByTitleCriteriaChanged(),
    });

    this.sortByDateBtn = this.createElementComponent.createButton({
      text: "Sort by date",
      eventToAdd: () => this.onSortByDateCriteriaChanged(),
    });

    this.titleArrow = this.createElementComponent.createSpan();
    this.dateArrow = this.createElementComponent.createSpan();

    this.container.append(
      this.sortByTitleBtn,
      this.titleArrow,
      this.sortByDateBtn,
      this.dateArrow,
    );
    this.target = document.getElementById(containerId);
    this.target.append(this.container);
  }

  setTitleArrow(sortDirection) {
    switch (sortDirection) {
      case 1:
        this.titleArrow.textContent = "\u2191";
        break;
      case -1:
        this.titleArrow.textContent = "\u2193";
        break;
      default:
        this.titleArrow.textContent = "";
        break;
    }
  }

  setDateArrow(sortDirection) {
    switch (sortDirection) {
      case 1:
        this.dateArrow.textContent = "\u2191";
        break;
      case -1:
        this.dateArrow.textContent = "\u2193";
        break;
      default:
        this.dateArrow.textContent = "";
        break;
    }
  }
}

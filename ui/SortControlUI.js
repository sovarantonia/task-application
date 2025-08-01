import { ButtonComponent } from "../components/ButtonComponent";
export class SortControlUI {
  constructor({ containerId, onSortCriteriaChanged, columnMap }) {
    this.onSortCriteriaChanged = onSortCriteriaChanged;
    const target = document.getElementById(containerId);
    const button = new ButtonComponent();

    for (let column of columnMap.keys()) {
      this.sortByColumnBtn = button.createButton({
        text: `Sort by ${column}`,
        eventToAdd: () => {
          this.onSortCriteriaChanged(column);
        },
      });
      target.append(this.sortByColumnBtn);
      // this.sortByColumnBtn.textContent += this.setTitleArrow(
      //   columnMap.get(column).direction,
      // );
      // console.log(columnMap.get(column).sortOption);
    }
  }

  setArrows(sortDirection) {
    switch (sortDirection) {
      case 1:
        return "\u2191";
      case -1:
        return "\u2193";
      default:
        return "";
    }
  }
}

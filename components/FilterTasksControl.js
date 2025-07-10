import { initialUserData } from "../data/initialUserData";
import { TaskStatus } from "../data/taskStatus";

export class FilterTasksControl {
  constructor(filterCriteria, renderPageFunction) {
    this.statusFilterSelect = document.getElementById("statusFilterSelect");
    this.userFilterSelect = document.getElementById("userFilterSelect");

    this.filterCriteria = filterCriteria;
    this.renderPage = renderPageFunction;
  }

  init() {
    this.populateSelect();
    this.addEvents();
  }

  populateSelect() {
    this.userFilterSelect.innerHTML = "";
    const allUserOption = document.createElement("option");
    allUserOption.value = allUserOption.text = "All";
    this.userFilterSelect.add(allUserOption);

    initialUserData.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.text = user.userName;
      this.userFilterSelect.add(option);
    });

    const allStatusOption = document.createElement("option");
    allStatusOption.value = allStatusOption.text = "All";

    this.statusFilterSelect.innerHTML = "";
    this.statusFilterSelect.add(allStatusOption);

    TaskStatus.forEach((taskStatus) => {
      const option = document.createElement("option");
      option.value = taskStatus.id;
      option.text = taskStatus.status;
      this.statusFilterSelect.add(option);
    });
  }

  addEvents() {
    this.statusFilterSelect.addEventListener("change", (e) => {
      const statusFilterOption = {
        property: "status",
        value: e.target.value,
      };
      const elementIndex = this.filterCriteria.findIndex(
        (option) => option.property === "status",
      );
      if (elementIndex === -1) {
        if (e.target.value !== "All") {
          this.filterCriteria.push(statusFilterOption);
        }
      } else {
        if (e.target.value !== "All") {
          this.filterCriteria[elementIndex] = statusFilterOption;
        } else {
          this.filterCriteria.splice(elementIndex, 1);
        }
      }

      this.renderPage();
    });

    this.userFilterSelect.addEventListener("change", (e) => {
      const userFilterOption = {
        property: "userName",
        value: e.target.value,
      };
      const elementIndex = this.filterCriteria.findIndex(
        (option) => option.property === "userName",
      );
      if (elementIndex === -1) {
        if (e.target.value !== "All") {
          this.filterCriteria.push(userFilterOption);
        }
      } else {
        if (e.target.value !== "All") {
          this.filterCriteria[elementIndex] = userFilterOption;
        } else {
          this.filterCriteria.splice(elementIndex, 1);
        }
      }

      this.renderPage();
    });
  }
}

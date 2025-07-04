import { initialUserData } from "../data/initialUserData";

export class CreateTaskModal {
  constructor() {
    //modal, open button, close button, form fields, submit
    this.openCreateModalBtn = document.getElementById("openCreateModalBtn");
    this.modal = document.getElementById("createTaskModal");
    this.closeModalBtn = document.getElementById("closeModalBtn");
    this.submitCreateTaskBtn = document.getElementById("submitCreateTaskBtn");
    this.form = document.getElementById("createTaskForm");
    this.titleInput = document.getElementById("titleInput");
    this.descriptionInput = document.getElementById("descriptionInput");
    this.userSelect = document.getElementById("userSelect");
    this.submitCreateTaskBtn = document.getElementById("submitCreateTaskBtn");

    this.modal.style.display = "none";
  }

  init() {
    this.populateUserSelect();
    this.actions();
  }

  populateUserSelect() {
    this.userSelect.innerHTML = "";
    initialUserData.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.text = user.name;
      this.userSelect.add(option);
    });
  }

  actions() {
    this.openCreateModalBtn.addEventListener("click", () => {
      this.modal.style.display = "block";
    });

    this.closeModalBtn.addEventListener("click", () => {
      this.modal.style.display = "none";
    });
  }
}

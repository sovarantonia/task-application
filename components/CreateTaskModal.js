import { initialUserData } from "../data/initialUserData";
import { TaskStatus } from "../data/taskStatus";

export class CreateTaskModal {
  constructor(taskService) {
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

    this.taskService = taskService;
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
      this.form.reset();
    });

    this.userSelect.addEventListener("change", (e) => {
      this.userSelect.value = e.target.value;
    });

    this.submitCreateTaskBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const selectedOption =
        this.userSelect.options[this.userSelect.selectedIndex];
      const assignedUserName = selectedOption.text;

      const newTask = {
        title: this.titleInput.value,
        description: this.descriptionInput.value,
        assignedUser: assignedUserName,
        status: TaskStatus.TODO,
      };

      this.taskService.saveTask(newTask).then((savedTask) => {
        this.modal.style.display = "none";
        console.log("Saved task: ", savedTask);
        this.form.reset();
      });
    });
  }
}

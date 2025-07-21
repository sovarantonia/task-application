import { renderTasks } from "../ui/taskListRenderer";
import { CreateElementComponent } from "../components/CreateElementComponent";
export class TaskPresentationUI {
  constructor(taskLogic = null) {
    this.taskRenderer = renderTasks("paginationContainer");
    this.taskLogic = taskLogic;
    // or something, atm i do this bcs i don't have other render function
    this.paginationReponse = this.taskLogic.getPagination(); // i get the tasks from the task logic, the result
    // not working
    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();
    this.pageIndicator = this.createElementComponent.createSpan();
  }

  renderTasks() {
    //   this.pageIndicator.textContent = `Page ${currentPageNo} of ${totalPages}`;
    // this.taskRenderer(this.taskItems);
    // debugger;
    console.log("ui");
    console.log(this.taskLogic.getPagination());
  }

  // addContainer(containerId) {
  //   const target = document.getElementById(containerId);
  //   target.appendChild(this.container);
  // }
}

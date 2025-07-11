import { generateGUID } from "../helpers/guidHelper";
import { DbService } from "./DbService";

export class TaskService {
  constructor(taskData) {
    this.service = new DbService(taskData);
  }

  saveTask(newTask) {
    const id = generateGUID();
    newTask.id = id;
    return this.service.save(newTask);
  }

  getTaskById(id) {
    return this.service.findById(id);
  }

  updateTask(task) {
    const { id, ...props } = task;
    return this.service.update(id, props);
  }

  getTasks(
    { currentPage, itemsPerPage },
    sortCriteria = [],
    filterCriteria = [],
  ) {
    return this.service.getPaginatedItems(
      { currentPage, itemsPerPage },
      sortCriteria,
      filterCriteria,
    );
  }
}

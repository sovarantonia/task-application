import { dateParser } from "../helpers/dateHelper";
import { generateGUID } from "../helpers/guidHelper";
import { DbService } from "./DbService";
export class TaskService {
  constructor(taskData) {
    taskData.forEach((task) => {
      dateParser(task.creationDate);
    });
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

  getTasks = (
    { currentPageNo, itemsPerPage },
    sortCriteria = [],
    filterCriteria = [],
  ) => {
    return this.service.getPaginatedItems(
      { currentPageNo, itemsPerPage },
      sortCriteria,
      filterCriteria,
    );
  };
}

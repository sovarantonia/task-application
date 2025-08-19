import { dateParser } from "../helpers/dateHelper";
import { generateGUID } from "../helpers/guidHelper";
import { DbService } from "./DbService";
export class TaskService {
  constructor(taskData) {
    taskData.forEach((task) => {
      dateParser(task.date);
    });
    this.service = new DbService(taskData);
  }

  saveTask({newTask}) {
    const id = generateGUID();
    newTask.id = id;
    return this.service.save({objToSave: newTask});
  }

  getTaskById(id) {
    return this.service.findById(id);
  }

  updateTask({task}) {
    const { id, ...props } = task;
    return this.service.update({id: id, props: props});
  }

  getPaginatedTasks = ({
    currentPageNo,
    itemsPerPage,
    sortCriteria = [],
    filterCriteria = [],
  }) => {
    return this.service.getPaginatedItems({
      currentPageNo,
      itemsPerPage,
      sortCriteria,
      filterCriteria,
    });
  };
}

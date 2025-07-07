import { generateGUID } from "../helpers/guidHelper";
export class TaskService {
  constructor(dbService) {
    this.service = dbService;
  }

  saveTask(newTask) {
    const id = generateGUID();
    newTask.id = id;
    return this.service.save(newTask);
  }

  getAllTasks() {
    return this.service.getAll();
  }

  getTaskById(id) {
    return this.service.findById(id);
  }

  updateTask(task) {
    const { id, ...props } = task;
    return this.service.update(id, props);
  }

  getTasks({ currentPage, itemsPerPage }) {
    return this.service.getPaginatedItems({ currentPage, itemsPerPage });
  }

  getTotalPages(itemsPerPage) {
    return this.service.getTotalPages(itemsPerPage);
  }
}

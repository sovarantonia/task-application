import { generateGUID } from "../helpers/guidHelper";
export class TaskService {

    constructor(dbService, pagination) {
        this.service = dbService;
        this.taskPagination = pagination;
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
        const {id, ...props} = task;
        return this.service.update(id, props);
    }

    getPaginatedTasks({currentPage, itemsPerPage}) {
        return this.taskPagination.getPaginatedElements({currentPage, itemsPerPage});
    }

    getTotalPages(itemsPerPage) {
        return this.taskPagination.getTotalPages(itemsPerPage);
    }



}
import { initialData } from "./initialData";
import { Task } from "./Task";
export class TaskService {

    constructor() {
        this.tasks = initialData.map(task => new Task(task.id, task.title, task.description, task.status, task.assignedUser))
        this.nextId = this.tasks.length;
    }

    saveTask(title, description, status, assignedUser) {
        this.nextId++;
        const newTask = new Task(this.nextId, title, description, status, assignedUser);
        this.tasks.push(newTask);
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.at(id - 1); 
    }

    updateTask(id, title, description, status, assignedUser) {
        let taskToUpdate = this.tasks.at(id - 1);
        if (taskToUpdate == null) {
            throw "Task does not exist";
        }

        if (title !== undefined) {
            taskToUpdate.title = title;
        }

         if (description !== undefined) {
            taskToUpdate.description = description;
        }

         if (status !== undefined) {
            taskToUpdate.status = status;
        }

         if (assignedUser !== undefined) {
            taskToUpdate.assignedUser = assignedUser;
        }

        return taskToUpdate;
    }

    getPaginatedTasks({currentPage, itemsPerPage}) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return this.tasks.slice(start, end);
    }

    getTotalPages(itemsPerPage) {
        return Math.ceil(this.tasks.length / itemsPerPage);
    }



}
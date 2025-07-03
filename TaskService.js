import { generateGUID } from "./helpers/guidHelper";
import { initialData } from "./initialData";
import { Task } from "./Task";
export class TaskService {

    constructor() {
        this.tasks = initialData;
    }

    saveTask(newTask) {
        const id = generateGUID();
        //const newTask = {id: id, title: title, description: description, status: status, assignedUser: assignedUser}
        this.tasks.push(newTask);
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id); 
    }

    updateTask({id, title, description, status, assignedUser}) {
        let taskToUpdate = this.tasks.at(id);
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
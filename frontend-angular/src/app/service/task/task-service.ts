import { Injectable } from "@angular/core";
import { Task } from "../../entity/task";
import { ApiService } from "../api/api-service";
import { RawPaginationDetails } from "../../entity/raw-pagination-details";


@Injectable({
    providedIn: "root"
})
export class TaskService {
    private entityName: string;

    constructor(private service: ApiService<Task>) {
        this.entityName = "Task";
    }

    public getPaginatedTasks(paginationDetails: RawPaginationDetails) {
        return this.service.getPaginatedItems(this.entityName, paginationDetails);
    }
}

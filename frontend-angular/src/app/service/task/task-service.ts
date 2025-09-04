import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";
import { Task } from "../../entity/task";
import { makeAutoObservable, observable } from "mobx";
import { ApiService } from "../api/api-service";
import { PaginationRequest } from "../../entity/pagination-request";
import { HttpClient } from "@angular/common/http";
import { PaginationResponse } from "../../entity/pagination-response";

@Injectable({
    providedIn: "root"
})
export class TaskService {

    constructor(private service: ApiService<Task>) {
    }

    public getPaginatedTasks(paginationRequest: PaginationRequest) {
       return this.service.getPaginatedItems("Task", paginationRequest);
    }
}

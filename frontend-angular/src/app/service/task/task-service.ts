import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";
import { Task } from "../../entity/task";
import { makeAutoObservable, observable } from "mobx";
import { ApiService } from "../api/api-service";

@Injectable({
    providedIn: "root"
})
export class TaskService {

    // public getPaginatedTasks(): Observable<PaginationDetails<Task>> {
    //     return this.http.post<PaginationDetails<Task>>('http://localhost:5143/Task/list', { currentPageNo: 1, itemsPerPage: 5, filterCriteria: [], sortCriteria: [] })
    //         .pipe(
    //             map((r) => ({ paginatedItems: r.paginatedItems, totalPages: r.totalPages }))
    //         );
    // }

    @observable paginatedTasks: Task[] = [];
    @observable totalPages: number = 0;

    constructor(private service: ApiService<Task>) {
        makeAutoObservable(this);
    }

    public async getPaginatedTasks() {
        const response = await this.service.getPaginatedItems("Task");
        this.paginatedTasks = response.paginatedItems;
        this.totalPages = response.totalPages;
    }
}

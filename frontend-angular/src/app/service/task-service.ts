import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";
import { Task } from "../entity/task";
import { PaginationDetails } from "../entity/pagination-details";
import { makeAutoObservable, observable } from "mobx";

@Injectable({
    providedIn: "root"
})
export class TaskService {
    private readonly http: HttpClient = inject(HttpClient);

    // public getPaginatedTasks(): Observable<PaginationDetails<Task>> {
    //     return this.http.post<PaginationDetails<Task>>('http://localhost:5143/Task/list', { currentPageNo: 1, itemsPerPage: 5, filterCriteria: [], sortCriteria: [] })
    //         .pipe(
    //             map((r) => ({ paginatedItems: r.paginatedItems, totalPages: r.totalPages }))
    //         );
    // }

    @observable paginatedTasks: Task[] = [];
    @observable totalPages: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    public async getPaginatedTasks() {
        const result = await firstValueFrom(this.http.post<PaginationDetails<Task>>('http://localhost:5143/Task/list', { currentPageNo: 1, itemsPerPage: 5, filterCriteria: [], sortCriteria: [] }));
        this.paginatedTasks = result.paginatedItems;
        this.totalPages = result.totalPages;
    }
}

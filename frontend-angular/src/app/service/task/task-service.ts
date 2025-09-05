import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";
import { Task } from "../../entity/task";
import { makeAutoObservable, observable } from "mobx";
import { ApiService } from "../api/api-service";
import { PaginationRequest } from "../../entity/pagination-request";
import { HttpClient } from "@angular/common/http";
import { PaginationResponse } from "../../entity/pagination-response";
import { RawPaginationDetails } from "../../entity/raw-pagination-details";
import { SortCriterion } from "../../entity/sort-criterion";

@Injectable({
    providedIn: "root"
})
export class TaskService {
    private entityName: string;

    constructor(private service: ApiService<Task>) {
        this.entityName = "Task";
    }

    public getPaginatedTasks(paginationDetails: RawPaginationDetails) {
        const pagerData = paginationDetails.pagerData;
        const sortCriteria: SortCriterion[] = Array.from(paginationDetails.sortCriteria.entries())
            .map(([key, value]) => ({
                property: key,
                direction: value
            }));
        const paginationRequest: PaginationRequest = { pagerData: pagerData, sortCriteria: sortCriteria, filterCriteria: [] };
        
        return this.service.getPaginatedItems(this.entityName, paginationRequest);
    }
}

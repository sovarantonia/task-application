import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { PaginationResponse } from "../../entity/pagination-response";
import { PaginationRequest } from "../../entity/pagination-request";

@Injectable({
    providedIn: "root"
})
export class ApiService<T> {
    private readonly baseUrl = "http://localhost:5143";
    private readonly http: HttpClient = inject(HttpClient);

    public getPaginatedItems(entityName: string, paginationRequest: PaginationRequest) {
        const body = {
            currentPageNo: paginationRequest.pagerData.currentPageNo,
            itemsPerPage: paginationRequest.pagerData.itemsPerPage,
            sortCriteria: paginationRequest.sortCriteria,
            filterCriteria: []
        };

        return firstValueFrom(this.http.post<PaginationResponse<T>>(`${this.baseUrl}/${entityName}/list`, body, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }));
    }
}

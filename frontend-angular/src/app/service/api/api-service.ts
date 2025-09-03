import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { PaginationResponse } from "../../entity/pagination-response";

@Injectable({
    providedIn: "root"
})
export class ApiService<T> {
    private readonly baseUrl = "http://localhost:5143";
    private readonly http: HttpClient = inject(HttpClient);

    public getPaginatedItems(entityName: string) {
        const body = { currentPageNo: 1, itemsPerPage: 5, filterCriteria: [], sortCriteria: [] };
        return firstValueFrom(this.http.post<PaginationResponse<T>>(`${this.baseUrl}/${entityName}/list`, body));
    }
}

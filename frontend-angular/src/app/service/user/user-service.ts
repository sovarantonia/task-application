import { Injectable } from "@angular/core";
import { User } from "../../entity/user";
import { ApiService } from "../api/api-service";
import { PaginationRequest } from "../../entity/pagination-request";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private entityName: string;

    constructor(private service: ApiService<User>) {
        this.entityName = "User";
    }

    public getPaginatedUsers(paginationRequest: PaginationRequest) {
        return this.service.getPaginatedItems(this.entityName, paginationRequest);
    }

    public getAllUsers() {
        return this.service.getAllItems(this.entityName);
    }
}

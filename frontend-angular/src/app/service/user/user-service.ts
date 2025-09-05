import { Injectable } from "@angular/core";
import { User } from "../../entity/user";
import { ApiService } from "../api/api-service";
import { RawPaginationDetails } from "../../entity/raw-pagination-details";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private entityName: string;

    constructor(private service: ApiService<User>) {
        this.entityName = "User";
    }

    public getPaginatedUsers(paginationDetails: RawPaginationDetails) {
        return this.service.getPaginatedItems(this.entityName, paginationDetails);
    }

    public getAllUsers() {
        return this.service.getAllItems(this.entityName);
    }
}

import { Injectable } from "@angular/core";
import { User } from "../../entity/user";
import { ApiService } from "../api/api-service";
import { PaginationRequest } from "../../entity/pagination-request";

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private service: ApiService<User>) {
    }

    public async getPaginatedUsers(paginationRequest: PaginationRequest) {
        return this.service.getPaginatedItems("User", paginationRequest);
    }
}

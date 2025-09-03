import { Injectable } from "@angular/core";
import { makeAutoObservable, observable } from "mobx";
import { User } from "../../entity/user";
import { ApiService } from "../api/api-service";

@Injectable({
    providedIn: "root"
})
export class UserService {
    @observable paginatedUsers: User[] = [];
    @observable totalPages: number = 0;

    constructor(private service: ApiService<User>) {
        makeAutoObservable(this);
    }

    public async getPaginatedUsers() {
        const response = await this.service.getPaginatedItems("User");
        this.paginatedUsers = response.paginatedItems;
        this.totalPages = response.totalPages;
    }
}

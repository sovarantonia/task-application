import { Injectable } from "@angular/core";
import { Status } from "../../entity/status";
import { ApiService } from "../api/api-service";

@Injectable({
    providedIn: "root"
})
export class StatusService {
    private entityName: string;

    constructor(private service: ApiService<Status>) {
        this.entityName = "Status";
    }

    getAllStatuses() {
        return this.service.getAllItems(this.entityName);
    }
}

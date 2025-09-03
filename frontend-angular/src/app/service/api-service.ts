import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginationDetails } from "../entity/pagination-details";
import { makeAutoObservable, observable } from "mobx";

// @Injectable({
//     providedIn: "root"
// })
// export class ApiService<T>{
//     private readonly baseUrl = "http://localhost:5143";
//     private readonly http: HttpClient = inject(HttpClient);

//     @observable items: T[] = [];

//     constructor() {
//         makeAutoObservable(this);
//     }

//     getPaginatedItems(){
//         return this.http.post(this.baseUrl)
//     }
// }

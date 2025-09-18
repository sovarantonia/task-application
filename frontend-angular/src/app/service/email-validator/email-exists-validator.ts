import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { catchError, debounceTime, map, Observable, of, switchMap } from "rxjs";
import { User } from "../../entity/user";

@Injectable({ providedIn: 'root' })
export class EmailExistsValidator {
    constructor(private http: HttpClient) { }

    checkEmailExists(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ emailExists: boolean } | null> => {
            if (!control.value) {
                return of(null); 
            }

            return of(control.value).pipe(
                debounceTime(500),
                switchMap((email) =>
                    this.http.get<User>(`http://localhost:5143/User/${email}`).pipe(
                       
                        map(() => ({ emailExists: true })),
                        catchError((error) => {
                            if (error.status === 404) {
                                return of(null);
                            }
                           
                            return of(null);
                        })
                    )
                )
            );
        };
    }
}

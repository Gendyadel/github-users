import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GithubUserService } from "../../services/github-user.service";
import * as SearchActions from "../actions/search.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class SearchEffects {
    constructor(private actions$: Actions, private userService: GithubUserService) { }
    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.updateSearchTerm),
        switchMap((action) => {
            return this.userService.searchUsers(action.searchTerm, action.includeDetails).pipe(
                map((users) => SearchActions.loadUsersSuccess({ users })),
                catchError(() => of(SearchActions.loadUsersError()))
            )
        })
    ));

    // Could also handle the error here but chose to use HTTP interceptor to handle it globally

}
import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const updateSearchTerm = createAction(
    '[Search] Update Search Term',
    props<{ searchTerm: string, includeDetails: boolean }>()
)

export const loadUsersSuccess = createAction(
    '[Search] Load Users Success',
    props<{ users: User[] }>()
);

export const loadUsersError = createAction(
    '[Search] Load Users Error'
);

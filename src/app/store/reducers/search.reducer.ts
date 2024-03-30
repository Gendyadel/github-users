import { createReducer, on } from "@ngrx/store";
import * as SearchActions from '../actions/search.actions';
import { initialState } from "../search.state";

export const searchReducer = createReducer(
    initialState,
    on(SearchActions.updateSearchTerm, (state, { searchTerm }) => ({
        ...state,
        searchTerm,
        loading: true,
    })),

    on(SearchActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        results: users
    })),

    on(SearchActions.loadUsersError, (state) => ({
        ...state,
        loading: false
    }))
);
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './../search.state';
export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchLoading = createSelector(
    selectSearchState,
    (state: SearchState) => state.loading
);

export const selectSearchResults = createSelector(
    selectSearchState,
    (state: SearchState) => state.results
);


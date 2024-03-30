import { User } from "../models/user.model";

export interface SearchState {
    searchTerm: string;
    loading: boolean;
    includeDetails: boolean;
    results: User[];
}
export const initialState: SearchState = {
    searchTerm: '',
    loading: false,
    includeDetails: false,
    results: [],
}

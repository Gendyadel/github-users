import { User } from "../models/user.model";

export interface SearchState {
    searchTerm: string;
    loading: boolean;
    results: User[];
}
export const initialState: SearchState = {
    searchTerm: '',
    loading: false,
    results: [],
}

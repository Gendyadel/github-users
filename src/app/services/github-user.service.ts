import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubUserService {
  private readonly BASE_URL = 'https://api.github.com/search/users';
  constructor(private http: HttpClient) { }

  /**
   * 
   * @param searchTerm 
   * @param perPage - optional number of users per page, default is 10
   * @returns {Observable<User[]>} an observable of users list 
   */
  searchUsers(searchTerm: string, includeDetails: boolean, perPage: number = 10): Observable<User[]> {
    const url = `${this.BASE_URL}?q=${searchTerm}&per_page=${perPage}`;
    if (!includeDetails) {
      return this.http.get<SearchResponse>(url).pipe(
        map(response => response.items)
      );
    } else {
      return this.http.get<SearchResponse>(url).pipe(
        switchMap(response => {
          let users = response.items;
          // Check if no users are found
          if (response.total_count === 0) {
            // return empty observable if no users found
            return of([]);
          }
          // Create an array of observables to fetch details for each user
          const requests: Observable<User>[] = users.map(user => {
            // Fetch user details for each user and then merge them with the original user object
            return this.getUserDetails(user.login).pipe(
              map(details => ({ ...user, ...details }))
            );
          });
          // Combine all observables into a single observable
          return forkJoin(requests);
        })
      );
    }
  }

  /**
   *  Get user details(followers,following, bio) by username
   * @param username - the username ("login") of the user
   * @return {Observable<User>} an observable of user details
   */
  getUserDetails(username: string): Observable<User> {
    const url = `https://api.github.com/users/${username}`;
    return this.http.get<User>(url);
  }
}
interface SearchResponse {
  total_count: number;
  items: User[];
}
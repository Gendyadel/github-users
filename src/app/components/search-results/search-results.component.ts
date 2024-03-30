import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AsyncPipe } from '@angular/common';
import { selectSearchLoading, selectSearchResults } from '../../store/selectors/search.selectors';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  users$: Observable<User[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.users$ = this.store.select(selectSearchResults);
    this.isLoading$ = this.store.select(selectSearchLoading);
  }

}

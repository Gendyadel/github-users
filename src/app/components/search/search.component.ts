import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateSearchTerm } from '../../store/actions/search.actions';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { GithubUserService } from '../../services/github-user.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnDestroy {
  searchForm: FormGroup;
  private formValueSubscription: Subscription;

  constructor(private store: Store, private user: GithubUserService
  ) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
      includeDetails: new FormControl(false),
    });
    this.formValueSubscription = this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.onSubmit();
      })
  }

  onSubmit() {
    const searchTerm = this.searchForm.value.searchTerm;
    const includeDetails = this.searchForm.value.includeDetails;
    this.store.dispatch(updateSearchTerm({ searchTerm , includeDetails}));
  }

  ngOnDestroy() {
    this.formValueSubscription.unsubscribe();
  }
}

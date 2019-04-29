import { Component, OnDestroy } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { ErrorState } from 'src/app/error/store/error.state';
import { Observable } from 'rxjs';
import { ResetErrors } from 'src/app/error/store/error.actions';

@Component({
  selector: 'el-error',
  template: `
  <div class="errors" *ngIf="(error$ | async) as error">
      {{ getErrorMessage(error)}}
    <a (click)="resetErrors()"><fa-icon [icon]="closeIcon"></fa-icon></a>
  </div>
`, styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {

  @Select(ErrorState) error$: Observable<Error>;

  constructor(private store: Store) { }

  closeIcon = faTimesCircle;

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  getErrorMessage({ statusText }) {
    return statusText
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetErrors());

  }

}

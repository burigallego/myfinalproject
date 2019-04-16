import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { GetUserProfile, Logout } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'el-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetUserProfile());
  }

  logout() {
    this.store.dispatch(new Logout);
  }
}

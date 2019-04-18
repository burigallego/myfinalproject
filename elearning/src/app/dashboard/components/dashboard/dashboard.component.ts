import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { GetUserProfile, Logout } from 'src/app/auth/store/auth.actions';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Auth } from 'src/app/auth/auth.models';

@Component({
  selector: 'el-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Select(AuthState) user$: Observable<Auth>;

  isAdmin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetUserProfile());
    this.user$.subscribe(user => {
      if (user.role == "admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  logout() {
    this.store.dispatch(new Logout);
  }
}

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Store, Select } from '@ngxs/store';
import { GetUserCourses } from '../../store/course.actions';
import { CourseState } from '../../store/course.state';
import { Observable } from 'rxjs';
import { Course } from '../../dashboard.models';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Auth } from 'src/app/auth/auth.models';

@Component({
  selector: 'el-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  @Select(CourseState) courses$: Observable<Course[]>;
  @Select(AuthState) user$: Observable<Auth>;

  @Input() cols;

  currentUser;





  ngOnInit() {
    this.store.dispatch(new GetUserCourses());
    this.user$.subscribe(user => {
      this.currentUser = user;
    })
    this.breakpointObserver.observe('(max-width: 1200px)').subscribe(result => {
      if (result.matches) {
        this.cols = 1;
      }
      else this.cols = 2;
    })
  }

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) { }
}

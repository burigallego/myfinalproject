import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Store, Select } from '@ngxs/store';
import { GetUserCourses } from '../../store/course.actions';
import { CourseState } from '../../store/course.state';
import { Observable } from 'rxjs';
import { Course } from '../../dashboard.models';

@Component({
  selector: 'el-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  @Select(CourseState) courses$: Observable<Course[]>;

  // userCourses;

  // /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return this.userCourses.map(course => {
  //         course.rows = 1;
  //         course.cols = 1;
  //       })
  //     }

  //     // { title: 'Card 1', cols: 2, rows: 1 },
  //     // { title: 'Card 2', cols: 1, rows: 1 },
  //     // { title: 'Card 3', cols: 1, rows: 2 },
  //     // { title: 'Card 4', cols: 1, rows: 1 }

  //     return this.userCourses.map((course, index) => {
  //       if (index % 4 == 0) {
  //         course.cols = 2;
  //         course.rows = 1;
  //       }
  //       if (index % 4 == 1) {
  //         course.cols = 1;
  //         course.rows = 1;
  //       }
  //       if (index % 4 == 2) {
  //         course.cols = 1;
  //         course.rows = 2;
  //       }
  //       if (index % 4 == 3) {
  //         course.cols = 1;
  //         course.rows = 1;
  //       }
  //     })
  //   })
  // );

  ngOnInit() {
    this.store.dispatch(new GetUserCourses());
    // this.courses$.subscribe(courses => {
    //   this.userCourses = courses;
    // })
  }

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) { }
}

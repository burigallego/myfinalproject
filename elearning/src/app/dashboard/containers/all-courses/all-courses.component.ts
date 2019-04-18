import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CourseState } from '../../store/course.state';
import { Observable } from 'rxjs';
import { Course } from '../../dashboard.models';
import { GetCourses } from '../../store/course.actions';

@Component({
  selector: 'el-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  @Select(CourseState) courses$: Observable<Course[]>;


  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetCourses);
  }

}

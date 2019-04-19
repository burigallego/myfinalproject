import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CourseState } from '../../store/course.state';
import { Observable } from 'rxjs';
import { Course } from '../../dashboard.models';
import { GetCourses, SearchCourses } from '../../store/course.actions';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'el-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  @Select(CourseState) courses$: Observable<Course[]>;
  searchForm = this.fb.group(
    {
      q: ['', [Validators.required]],
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) { }

  searchCourses() {
    if (this.searchForm.valid) {
      this.store.dispatch(new SearchCourses(this.searchForm.value));
    }
  }
  ngOnInit() {
    this.store.dispatch(new GetCourses);
  }

}

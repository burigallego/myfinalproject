import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CourseState } from '../../store/course.state';
import { Observable, fromEvent } from 'rxjs';
import { Course } from '../../dashboard.models';
import { GetCourses, SearchCourses } from '../../store/course.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Auth } from 'src/app/auth/auth.models';

@Component({
  selector: 'el-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  @Select(CourseState) courses$: Observable<Course[]>;
  @Select(AuthState) user$: Observable<Auth>;




  currentUser;

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
    this.user$.subscribe(user => {
      this.currentUser = user
    });

  }

}

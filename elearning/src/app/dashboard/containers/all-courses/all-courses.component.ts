import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CourseState } from '../../store/course.state';
import { Observable, fromEvent } from 'rxjs';
import { Course } from '../../dashboard.models';
import { GetCourses, SearchCourses, GetUserCourses } from '../../store/course.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Auth } from 'src/app/auth/auth.models';
import { GetUserProfile } from 'src/app/auth/store/auth.actions';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'el-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  @Select(CourseState.getSubscribedStatusCourses) allCourses$: Observable<Course[]>;
  @Select(CourseState.getMyCourses) myCourses$: Observable<Course[]>
  @Select(AuthState) user$: Observable<Auth>;

  @Input() cols;


  ;

  searchForm = this.fb.group(
    {
      q: [''],
    },
  );

  constructor(private fb: FormBuilder, private store: Store, private breakpointObserver: BreakpointObserver) { }



  searchCourses() {
    if (this.searchForm.valid) {
      this.store.dispatch(new SearchCourses(this.searchForm.value));
    }
  }


  ngOnInit() {
    //this.store.dispatch(new GetUserProfile());
    // this.user$.subscribe(user => {
    //   this.currentUser = user
    // });
    this.store.dispatch(new GetCourses());
    this.store.dispatch(new GetUserCourses());
    this.breakpointObserver.observe('(max-width: 1200px)').subscribe(result => {
      if (result.matches) {
        this.cols = 1;
      }
      else this.cols = 2;
    })

  }

}

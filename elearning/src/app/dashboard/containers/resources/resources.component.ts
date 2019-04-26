import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetCourseResources, CreateLink } from '../../store/resource.actions';
import { ResourceState } from '../../store/resource.state';
import { Observable } from 'rxjs';
import { Resource, Course } from '../../dashboard.models';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Auth } from 'src/app/auth/auth.models';
import { CourseState } from '../../store/course.state';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { GetCourse } from '../../store/course.actions';


@Component({
  selector: 'el-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements OnInit {

  @Select(ResourceState) resources$: Observable<Resource[]>;
  @Select(AuthState) user$: Observable<Auth>;
  @Select(CourseState.getCourse) course$: Observable<Course[]>;

  studentsIcon = faGraduationCap;
  // course;
  // currentUser;
  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetCourseResources(routeParams.courseId));
      this.store.dispatch(new GetCourse(routeParams.courseId))
      // this.course$.subscribe(course => {
      //   this.course = course
      // });
    });
    // this.user$.subscribe(user => {
    //   this.currentUser = user;
    // });
  }


}
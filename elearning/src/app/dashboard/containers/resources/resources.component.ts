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

@Component({
  selector: 'el-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements OnInit {

  @Select(ResourceState) resources$: Observable<Resource[]>;
  @Select(AuthState) user$: Observable<Auth>;
  @Select(CourseState) courses$: Observable<Course[]>;

  course;
  currentUser;
  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetCourseResources(routeParams.courseId));
      this.courses$.subscribe(courses => {
        [this.course] = courses.filter(course => (course.course_id == routeParams.courseId))
      });
    })
    this.user$.subscribe(user => {
      this.currentUser = user;
    });
  }


}
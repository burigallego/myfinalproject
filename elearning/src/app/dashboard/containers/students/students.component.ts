import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetCourseUsers } from '../../store/profile.actions';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Observable } from 'rxjs';
import { Auth, Profile } from 'src/app/auth/auth.models';
import { ProfileState } from '../../store/profile.state';

@Component({
  selector: 'el-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @Select(AuthState) user$: Observable<Auth>;
  @Select(ProfileState) users$: Observable<Profile[]>;
  currentUser;
  courseId;
  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetCourseUsers(routeParams.courseId));
      this.courseId = routeParams.courseId;
    });
    this.user$.subscribe(user => this.currentUser = user);
  }

}

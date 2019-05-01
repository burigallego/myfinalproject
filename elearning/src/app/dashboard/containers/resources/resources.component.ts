import { Component, OnInit, Input } from '@angular/core';
import { Store, Select, Actions, ofActionCompleted } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetCourseResources, CreateLink } from '../../store/resource.actions';
import { ResourceState } from '../../store/resource.state';
import { Observable } from 'rxjs';
import { Resource, Course, Work } from '../../dashboard.models';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Auth } from 'src/app/auth/auth.models';
import { CourseState } from '../../store/course.state';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { GetCourse } from '../../store/course.actions';
import { WorkState } from '../../store/work.state';
import { GetWorks, SendWorkSuccess } from '../../store/work.actions';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { WorkSuccessPopupComponent } from '../work-success-popup/work-success-popup.component';


@Component({
  selector: 'el-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements OnInit {

  @Select(ResourceState) resources$: Observable<Resource[]>;
  @Select(AuthState) user$: Observable<Auth>;
  @Select(CourseState.getCourse) course$: Observable<Course[]>;
  @Select(WorkState) work$: Observable<Work>

  studentsIcon = faGraduationCap;
  // course;
  // currentUser;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private actions$: Actions,
    private dialog: MatDialog
  ) { }

  user;

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetCourseResources(routeParams.courseId));
      this.store.dispatch(new GetCourse(routeParams.courseId));
      this.store.dispatch(new GetWorks(routeParams.courseId));
    });
    this.actions$
      .pipe(ofActionCompleted(SendWorkSuccess))
      .subscribe(() => {
        this.openDialog();
      });

  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';



    const dialogRef = this.dialog.open(WorkSuccessPopupComponent, dialogConfig);


  }


}
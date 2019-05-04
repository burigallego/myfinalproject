import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Store, Actions, ofActionCompleted } from '@ngxs/store';
import { AddCourse, AddCourseSuccess } from '../../store/course.actions';
import { GetUserProfile } from 'src/app/auth/store/auth.actions';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CourseSuccessPopupComponent } from '../course-success-popup/course-success-popup.component';

@Component({
  selector: 'el-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  courseForm = this.fb.group(
    {
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;


  constructor(private fb: FormBuilder, private store: Store, private actions$: Actions, private dialog: MatDialog) { }

  addCourse() {
    if (this.courseForm.valid) {
      this.store.dispatch(new AddCourse(this.courseForm.value));
      this.formDirective.resetForm();
    }
  }

  ngOnInit() {
    this.actions$
      .pipe(ofActionCompleted(AddCourseSuccess))
      .subscribe(() => {
        this.openDialog();
      });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';





    const dialogRef = this.dialog.open(CourseSuccessPopupComponent, dialogConfig);


  }


}

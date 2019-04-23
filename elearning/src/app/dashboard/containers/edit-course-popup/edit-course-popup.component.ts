import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CourseState } from '../../store/course.state';
import { Course } from '../../dashboard.models';

@Component({
  selector: 'el-edit-course-popup',
  templateUrl: './edit-course-popup.component.html',
  styleUrls: ['./edit-course-popup.component.scss']
})
export class EditCoursePopupComponent implements OnInit {


  description: string;
  title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCoursePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.title = data.title;
  }

  editCourseForm = this.fb.group(
    {
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    },
    { updateOn: 'blur' });


  ngOnInit() {
    this.editCourseForm.setValue({
      title: this.title || '',
      description: this.description || '',
    });
  }

  edit() {
    this.dialogRef.close(this.editCourseForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}

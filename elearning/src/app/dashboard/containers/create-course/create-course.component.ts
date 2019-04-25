import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddCourse } from '../../store/course.actions';
import { GetUserProfile } from 'src/app/auth/store/auth.actions';

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

  constructor(private fb: FormBuilder, private store: Store) { }

  addCourse() {
    if (this.courseForm.valid) {
      this.store.dispatch(new AddCourse(this.courseForm.value));
    }
  }

  ngOnInit() {
  }



}

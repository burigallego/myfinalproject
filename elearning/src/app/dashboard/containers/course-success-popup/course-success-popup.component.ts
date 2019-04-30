import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'el-course-success-popup',
  templateUrl: './course-success-popup.component.html',
  styleUrls: ['./course-success-popup.component.scss']
})
export class CourseSuccessPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CourseSuccessPopupComponent>) {

  }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close();
  }
}


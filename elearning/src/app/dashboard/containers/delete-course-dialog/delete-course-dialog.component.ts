import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'el-delete-course-dialog',
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.scss']
})
export class DeleteCourseDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

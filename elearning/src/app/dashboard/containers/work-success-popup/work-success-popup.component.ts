import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'el-work-success-popup',
  templateUrl: './work-success-popup.component.html',
  styleUrls: ['./work-success-popup.component.scss']
})
export class WorkSuccessPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WorkSuccessPopupComponent>) {

  }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close();
  }

}

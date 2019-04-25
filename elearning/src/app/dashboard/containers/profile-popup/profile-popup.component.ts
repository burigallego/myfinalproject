import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'el-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {

  tlf;
  address;
  fullName;


  constructor(
    public dialogRef: MatDialogRef<ProfilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.tlf = data.tlf;
    this.address = data.address;
    this.fullName = data.fullName;
  }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close();
  }
}

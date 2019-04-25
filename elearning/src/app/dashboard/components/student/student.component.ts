import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProfilePopupComponent } from '../../containers/profile-popup/profile-popup.component';

@Component({
  selector: 'el-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student;
  @Input() user;
  isMe;
  constructor(private dialog: MatDialog) { }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tlf: this.student.tlf,
      address: this.student.address,
      fullName: this.student.fullName
    };



    const dialogRef = this.dialog.open(ProfilePopupComponent, dialogConfig);


  }

  ngOnInit() {
    this.isMe = (this.user.uuid == this.student.uuid);
  }

}

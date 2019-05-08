import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'el-activate-account-popup',
  templateUrl: './activate-account-popup.component.html',
  styleUrls: ['./activate-account-popup.component.scss']
})
export class ActivateAccountPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ActivateAccountPopupComponent>) {

  }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close();
  }
}

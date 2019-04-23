import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'el-edit-resource-popup',
  templateUrl: './edit-resource-popup.component.html',
  styleUrls: ['./edit-resource-popup.component.scss']
})
export class EditResourcePopupComponent implements OnInit {


  resourceName: string;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditResourcePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.resourceName = data.resourceName;
  }

  editResourceForm = this.fb.group(
    {
      resourceName: ['', [Validators.required]],
    },
    { updateOn: 'blur' });


  ngOnInit() {
    this.editResourceForm.setValue({
      resourceName: this.resourceName || '',
    });
  }

  edit() {
    this.dialogRef.close(this.editResourceForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}

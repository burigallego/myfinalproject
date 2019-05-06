import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, Select, Actions, ofActionCompleted } from '@ngxs/store';
import { SendWork, GetWorks, GetWorksFailed, SendWorkSuccess } from '../../store/work.actions';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { WorkState } from '../../store/work.state';
import { Observable } from 'rxjs';
import { Work } from '../../dashboard.models';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'el-work-upload',
  templateUrl: './work-upload.component.html',
  styleUrls: ['./work-upload.component.scss']
})
export class WorkUploadComponent implements OnInit {

  @Input() course;
  @Input() user;

  @Select(WorkState) work$: Observable<Work>;


  notLoaded: boolean = true;

  downloadIcon = faDownload;

  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(private fb: FormBuilder, private store: Store, private cd: ChangeDetectorRef, private actions$: Actions, private dialog: MatDialog) { }

  workForm = this.fb.group({
    file: []
  })

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.workForm.get('file').setValue(file);
        this.notLoaded = false;
      };
    }
  }

  addWork() {
    if (this.workForm.valid) {
      this.store.dispatch(new SendWork(this.workForm.value, this.course.course_id));
    }

  }

  dontNavigate(url) {
    if (url == null) {
      return false;
    }
  }

  subscription;

  ngOnInit() {

    this.subscription = this.actions$
      .pipe(ofActionCompleted(SendWorkSuccess))
      .subscribe(() => {
        this.notLoaded = true;
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

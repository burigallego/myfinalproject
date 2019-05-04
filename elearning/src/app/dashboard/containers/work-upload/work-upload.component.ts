import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, Select, Actions, ofActionCompleted } from '@ngxs/store';
<<<<<<< HEAD
import { SendWork, GetWorks, GetWorksFailed, SendWorkSuccess } from '../../store/work.actions';
=======
import { SendWork, GetWorks, GetWorksFailed } from '../../store/work.actions';
>>>>>>> cc88621e4af749c8dd2512f4dc5fdc26f9744950
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
<<<<<<< HEAD
=======

  @Select(WorkState) work$: Observable<Work>;

>>>>>>> cc88621e4af749c8dd2512f4dc5fdc26f9744950

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

<<<<<<< HEAD
  dontNavigate(url) {
    if (url == null) {
      return false;
    }
  }

  ngOnInit() {
    if (this.user.role == 'admin') {
      this.store.dispatch(new GetWorks(this.course.course_id));
    }
    this.actions$
      .pipe(ofActionCompleted(SendWorkSuccess))
      .subscribe(() => {
        this.notLoaded = true;
      });
  }

=======
  ngOnInit() {
    if (this.user.role == 'admin') {
      this.store.dispatch(new GetWorks(this.course.course_id));
    }

  }

>>>>>>> cc88621e4af749c8dd2512f4dc5fdc26f9744950
}

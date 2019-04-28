import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SendWork } from '../../store/work.actions';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'el-work-upload',
  templateUrl: './work-upload.component.html',
  styleUrls: ['./work-upload.component.scss']
})
export class WorkUploadComponent implements OnInit {

  @Input() course;
  @Input() user;
  @Input() work;

  loading: boolean = false;

  downloadIcon = faDownload;

  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(private fb: FormBuilder, private store: Store, private cd: ChangeDetectorRef) { }

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

      };
    }
  }

  addWork() {
    this.loading = true;
    if (this.workForm.valid) {
      this.store.dispatch(new SendWork(this.workForm.value, this.course.course_id));
    }

  }

  ngOnInit() {

  }


}

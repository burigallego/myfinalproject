import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateFile } from '../../store/resource.actions';

@Component({
  selector: 'el-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent {
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  fileForm = this.fb.group({
    resourceName: ['', Validators.required],
    file: []
  })

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileForm.get('file').setValue(file);

      };
    }
  }



  addFile() {
    this.loading = true;
    if (this.fileForm.valid) {
      this.route.params.subscribe(routeParams => {
        this.store.dispatch(new CreateFile(this.fileForm.value, routeParams.courseId));
      })
    }

  }




}






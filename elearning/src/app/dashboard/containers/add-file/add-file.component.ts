import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
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

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;


  fileForm = this.fb.group({
    resourceName: ['', Validators.required],
    file: ['', Validators.required]
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
    if (this.fileForm.valid) {
      this.route.params.subscribe(routeParams => {
        this.store.dispatch(new CreateFile(this.fileForm.value, routeParams.courseId));
        this.formDirective.resetForm();
      })
    }

  }




}






import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateLink } from '../../store/resource.actions';

@Component({
  selector: 'el-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent implements OnInit {

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
  }
  linkForm = this.fb.group(
    {
      url: ['', [Validators.required]],
      resourceName: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );


  addLink() {
    if (this.linkForm.valid) {
      this.route.params.subscribe(routeParams => {
        this.store.dispatch(new CreateLink(this.linkForm.value, routeParams.courseId));
      })
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { DeleteLink } from '../../store/resource.actions';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'el-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  @Input() resource;
  @Input() course;

  deleteIcon = faTrash;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  deleteLink() {
    this.store.dispatch(new DeleteLink(this.resource.resource_id, this.course.course_id));
  }

  deleteResource() {
    if (this.resource.type == 0) {
      this.deleteLink();
    } else {

    }
  }

}

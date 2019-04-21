import { Component, OnInit, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { DeleteLink, DeleteFile } from '../../store/resource.actions';

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

  deleteFile() {
    this.store.dispatch(new DeleteFile(this.resource.resource_id, this.course.course_id, this.resource.public_id));
  }

  deleteResource() {
    if (this.resource.type == 0) {
      this.deleteLink();
    } else {
      this.deleteFile();
    }
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { DeleteLink, DeleteFile } from '../../store/resource.actions';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteCourseDialogComponent } from '../../containers/delete-course-dialog/delete-course-dialog.component';

@Component({
  selector: 'el-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  @Input() resource;
  @Input() course;
  @Input() user;


  deleteIcon = faTrash;
  constructor(private store: Store, private dialog: MatDialog) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = `Are you sure you want to delete this resource?`;

    const dialogRef = this.dialog.open(DeleteCourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteResource();

      }
    })

  }

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

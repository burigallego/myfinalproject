import { Component, OnInit, Input } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { DeleteLink, DeleteFile, EditResource } from '../../store/resource.actions';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteCourseDialogComponent } from '../../containers/delete-course-dialog/delete-course-dialog.component';
import { EditResourcePopupComponent } from '../../containers/edit-resource-popup/edit-resource-popup.component';
import { ResourceRequest } from '../../dashboard.models';

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
  editIcon = faPencilAlt;

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

  openEdit() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      resourceName: this.resource.resource_name,
    };



    const dialogRef = this.dialog.open(EditResourcePopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editResource(result, this.resource.resource_id);

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

  editResource(resourceRequest: ResourceRequest, resourceId) {
    this.store.dispatch(new EditResource(resourceRequest, resourceId));
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { DeleteCourse } from '../../store/course.actions';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteCourseDialogComponent } from '../../containers/delete-course-dialog/delete-course-dialog.component';



@Component({
  selector: 'el-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() course;
  @Input() user;

  constructor(private store: Store, private dialog: MatDialog) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = `Are you sure you want to delete this course?`;

    const dialogRef = this.dialog.open(DeleteCourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCourse();

      }
    })

  }
  deleteIcon = faTrash;

  ngOnInit() {
  }

  deleteCourse() {
    this.store.dispatch(new DeleteCourse(this.course.course_id));
  }
}

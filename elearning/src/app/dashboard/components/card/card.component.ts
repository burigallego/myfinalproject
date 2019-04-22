import { Component, OnInit, Input } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { DeleteCourse, EditCourse } from '../../store/course.actions';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteCourseDialogComponent } from '../../containers/delete-course-dialog/delete-course-dialog.component';
import { EditCoursePopupComponent } from '../../containers/edit-course-popup/edit-course-popup.component';
import { CourseComponent } from '../course/course.component';
import { CourseRequest } from '../../dashboard.models';



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

  openEdit() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: this.course.title,
      description: this.course.description
    };



    const dialogRef = this.dialog.open(EditCoursePopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editCourse(result, this.course.course_id);

      }
    })
  }

  deleteIcon = faTrash;
  editIcon = faPencilAlt;

  ngOnInit() {
  }

  deleteCourse() {
    this.store.dispatch(new DeleteCourse(this.course.course_id));
  }

  editCourse(courseRequest: CourseRequest, courseId) {
    this.store.dispatch(new EditCourse(courseRequest, courseId));
  }
}

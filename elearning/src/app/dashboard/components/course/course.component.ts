import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { SubscribeCourse } from '../../store/course.actions';

@Component({
  selector: 'el-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course;
  @Input() user;

  subscribedCourse;
  isCreator: boolean;
  constructor(private store: Store) { }

  ngOnInit() {
    if (this.user && this.user.yourCourses) {
      this.subscribedCourse = this.user.yourCourses.filter(item => (item.course_id == this.course.course_id));
      console.log(this.subscribedCourse);
      if (this.subscribedCourse.length !== 0) {
        this.isCreator = (this.subscribedCourse[0].creator === this.course.creator);
      } else {
        this.isCreator = false;
      }
    }

  }

  subscribe() {
    this.store.dispatch(new SubscribeCourse(this.course.course_id))
  }

}

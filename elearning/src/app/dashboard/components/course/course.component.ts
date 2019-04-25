import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { UnsubscribeCourse, SubscribeCourse } from 'src/app/auth/store/auth.actions';

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
  isSubscribing;
  isUnsubscribing;
  constructor(private store: Store) { }

  ngOnInit() {
    if (this.user && this.user.yourCourses) {
      this.subscribedCourse = this.user.yourCourses.filter(item => (item.course_id == this.course.course_id));
      console.log(this.subscribedCourse);
      if (this.subscribedCourse.length !== 0) {
        this.isCreator = (this.user.uuid === this.subscribedCourse[0].creator);
      } else {
        this.isCreator = false;
      };
      console.log(this.isCreator);
      this.isSubscribing = ((this.isCreator == true) || (this.subscribedCourse.length !== 0));
      this.isUnsubscribing = ((this.isCreator == true) || (this.subscribedCourse.length === 0));
      console.log(this.isSubscribing, this.isUnsubscribing);
    }

  }

  subscribe() {
    this.store.dispatch(new SubscribeCourse(this.course.course_id))
  }

  unsubscribe() {
    this.store.dispatch(new UnsubscribeCourse(this.course.course_id))
  }
}

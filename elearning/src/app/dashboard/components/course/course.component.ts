import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { SubscribeCourse, UnsubscribeCourse } from '../../store/course.actions';

@Component({
  selector: 'el-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course;
  @Input() user;


  constructor(private store: Store) { }

  ngOnInit() {

  }


  subscribe() {
    this.store.dispatch(new SubscribeCourse(this.course.course_id))
  }

  unsubscribe() {
    this.store.dispatch(new UnsubscribeCourse(this.course.course_id))
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'el-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student;
  @Input() user;
  isMe;
  constructor() { }

  ngOnInit() {
    this.isMe = (this.user.uuid == this.student.uuid);
  }

}

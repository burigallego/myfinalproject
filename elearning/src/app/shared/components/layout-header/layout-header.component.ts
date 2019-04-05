import { Component, OnInit } from '@angular/core';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'el-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logo = faChalkboardTeacher;
  title = "E-learning for all"

}

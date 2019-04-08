import { Component, OnInit } from '@angular/core';
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'el-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  title = "Elearning for all"
  logo = faChalkboardTeacher;

  constructor() { }

  ngOnInit() {
  }

}

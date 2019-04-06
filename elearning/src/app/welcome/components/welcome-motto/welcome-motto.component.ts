import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'el-welcome-motto',
  templateUrl: './welcome-motto.component.html',
  styleUrls: ['./welcome-motto.component.scss']
})
export class WelcomeMottoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title: "Welcome to your future"
}

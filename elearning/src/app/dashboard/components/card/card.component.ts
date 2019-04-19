import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'el-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() course;
  constructor() { }

  ngOnInit() {
  }

}

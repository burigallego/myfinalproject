import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'el-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location) { }

  status = this.route.snapshot.params['status'];

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

}

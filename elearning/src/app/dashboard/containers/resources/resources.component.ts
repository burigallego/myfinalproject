import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetCourseResources, CreateLink } from '../../store/resource.actions';
import { ResourceState } from '../../store/resource.state';
import { Observable } from 'rxjs';
import { Resource } from '../../dashboard.models';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'el-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements OnInit {

  @Select(ResourceState) resources$: Observable<Resource[]>;


  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetCourseResources(routeParams.courseId));
    })
  }


}
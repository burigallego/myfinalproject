import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GetCourseResources } from '../../store/resource.actions';
import { ResourceState } from '../../store/resource.state';
import { Observable } from 'rxjs';
import { Resource } from '../../dashboard.models';

@Component({
  selector: 'el-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})

export class ResourcesComponent implements OnInit {

  @Select(ResourceState) resources$: Observable<Resource[]>;


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetCourseResources(routeParams.courseId));
    })
  }


}
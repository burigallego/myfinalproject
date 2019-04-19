import { State, Store, StateContext, Action } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { GetCourseResources, GetCourseResourcesSuccess, GetCourseResourcesFailed } from './resource.actions';
import { Resource } from '../dashboard.models';


@State<Resource[]>({
    name: 'resources',
    defaults: []
})

export class ResourceState {
    constructor(private store: Store, private dashboardService: DashboardService) { }


    @Action(GetCourseResources)
    getCourseResources({ dispatch }: StateContext<Resource[]>, { courseId }: GetCourseResources) {
        return this.dashboardService.getCourseResources(courseId).pipe(
            tap(resources => dispatch(new GetCourseResourcesSuccess(resources))),
            catchError(error => dispatch(new GetCourseResourcesFailed(error.error)))
        );
    }

    @Action(GetCourseResourcesSuccess)
    getUserCoursesSuccess(
        { setState }: StateContext<Resource[]>,
        { resources }: GetCourseResourcesSuccess
    ) {
        setState(resources);

    }


    @Action([GetCourseResourcesFailed])
    error({ dispatch }: StateContext<Resource[]>, { errors }: any) {
        //dispatch(new SetErrors(errors));
        console.log(errors);
    }
}
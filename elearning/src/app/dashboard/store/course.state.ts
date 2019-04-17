import { State, Store, StateContext, Action } from '@ngxs/store';
import { Course } from '../dashboard.models';
import { tap, catchError } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { GetUserCourses, GetUserCoursesSuccess, GetUserCoursesFailed } from './course.actions';


@State<Course[]>({
    name: 'courses',
    defaults: []
})

export class CourseState {
    constructor(private store: Store, private dashboardService: DashboardService) { }

    @Action(GetUserCourses)
    getUserCourses({ dispatch }: StateContext<Course[]>, action: GetUserCourses) {
        return this.dashboardService.getUserCourses().pipe(
            tap(courses => dispatch(new GetUserCoursesSuccess(courses))),
            catchError(error => dispatch(new GetUserCoursesFailed(error.error)))
        );
    }

    @Action(GetUserCoursesSuccess)
    getUserCoursesSuccess(
        { setState, dispatch }: StateContext<Course[]>,
        { courses }: GetUserCoursesSuccess
    ) {
        setState(courses);

    }

    @Action(GetUserCoursesFailed)
    error({ dispatch }: StateContext<Course[]>, { errors }: any) {
        //dispatch(new SetErrors(errors));
        console.log(errors);
    }
}

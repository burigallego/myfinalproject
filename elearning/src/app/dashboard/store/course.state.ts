import { State, Store, StateContext, Action } from '@ngxs/store';
import { Course } from '../dashboard.models';
import { tap, catchError } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { GetUserCourses, GetUserCoursesSuccess, GetUserCoursesFailed, AddCourseFailed, AddCourse, AddCourseSuccess, GetCoursesFailed, GetCourses, GetCoursesSuccess, SubscribeCourseFailed, SubscribeCourse, SubscribeCourseSuccess, SearchCoursesFailed, SearchCourses, SearchCoursesSuccess } from './course.actions';


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
        { setState }: StateContext<Course[]>,
        { courses }: GetUserCoursesSuccess
    ) {
        setState(courses);

    }

    @Action(GetCourses)
    getCourses({ dispatch }: StateContext<Course[]>, action: GetCourses) {
        return this.dashboardService.getCourses().pipe(
            tap(courses => dispatch(new GetCoursesSuccess(courses))),
            catchError(error => dispatch(new GetCoursesFailed(error.error)))
        );
    }

    @Action(GetCoursesSuccess)
    getCoursesSuccess(
        { setState }: StateContext<Course[]>,
        { courses }: GetCoursesSuccess
    ) {
        setState(courses);

    }

    @Action(SearchCourses)
    searchCourses({ dispatch }: StateContext<Course[]>, { searchRequest }: SearchCourses) {
        return this.dashboardService.searchCourses(searchRequest).pipe(
            tap(courses => dispatch(new SearchCoursesSuccess(courses))),
            catchError(error => dispatch(new SearchCoursesFailed(error.error)))
        );
    }

    @Action(SearchCoursesSuccess)
    searchCoursesSuccess(
        { setState }: StateContext<Course[]>,
        { courses }: SearchCoursesSuccess
    ) {
        setState(courses);

    }

    @Action(SubscribeCourse)
    subscribeCourse({ dispatch }: StateContext<Course[]>, { courseId }: SubscribeCourse) {
        return this.dashboardService.subscribeCourse(courseId).pipe(
            tap(() => dispatch(new SubscribeCourseSuccess())),
            catchError(error => dispatch(new SubscribeCourseFailed(error.error)))
        );
    }

    @Action(SubscribeCourseSuccess)
    subscribeCourseSuccess() { }


    @Action(AddCourse)
    addCourse({ dispatch }: StateContext<Course[]>, { courseRequest }: AddCourse) {
        return this.dashboardService.addCourse(courseRequest).pipe(
            tap(course => dispatch(new AddCourseSuccess(course))),
            catchError(error => dispatch(new AddCourseFailed(error.error)))
        );
    }

    @Action(AddCourseSuccess)
    addCourseSuccess(
        { setState, getState }: StateContext<Course[]>,
        { course }: AddCourseSuccess
    ) {
        setState([...getState(), course]);
    }


    @Action([GetUserCoursesFailed, GetCoursesFailed, AddCourseFailed, SubscribeCourseFailed, SearchCoursesFailed])
    error({ dispatch }: StateContext<Course[]>, { errors }: any) {
        //dispatch(new SetErrors(errors));
        console.log(errors);
    }
}

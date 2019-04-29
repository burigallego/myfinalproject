import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { Course, Courses } from '../dashboard.models';
import { tap, catchError } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { GetUserCourses, GetUserCoursesSuccess, GetUserCoursesFailed, AddCourseFailed, AddCourse, AddCourseSuccess, GetCoursesFailed, GetCourses, GetCoursesSuccess, SearchCoursesFailed, SearchCourses, SearchCoursesSuccess, DeleteCourseFailed, DeleteCourse, DeleteCourseSuccess, EditCourseFailed, EditCourse, EditCourseSuccess, GetCourseFailed, GetCourse, GetCourseSuccess, SubscribeCourse, SubscribeCourseSuccess, SubscribeCourseFailed, UnsubscribeCourseFailed, UnsubscribeCourse, UnsubscribeCourseSuccess } from './course.actions';
import { SetErrors } from 'src/app/error/store/error.actions';
import { GetUserProfile, Logout } from 'src/app/auth/store/auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { AuthService } from 'src/app/auth/services/auth.service';


@State<Courses>({
    name: 'courses',
    defaults: {
        myCourses: [],
        allCourses: [],
        course: null,
    }
})

export class CourseState {
    constructor(private store: Store, private dashboardService: DashboardService, private authService: AuthService) { }


    @Selector()
    static getAllCourses({ allCourses }: Courses) {
        return allCourses;
    }

    @Selector()
    static getMyCourses({ myCourses }: Courses) {
        return myCourses;
    }

    @Selector()
    static getCourse({ course }: Courses) {
        return course;
    }

    @Selector()
    static getSubscribedStatusCourses({ myCourses, allCourses }: Courses) {

        const subscribedCourses = allCourses.map((course) => {
            const courseInMyCourses = myCourses.filter(item => (item.course_id == course.course_id));
            if (courseInMyCourses.length > 0) {
                return {
                    ...course,
                    isSubscribed: true
                }
            } else return {
                ...course,
                isSubscribed: false
            }

        })

        return subscribedCourses
    }



    @Action(GetUserCourses)
    getUserCourses({ dispatch }: StateContext<Courses>, action: GetUserCourses) {
        return this.dashboardService.getUserCourses().pipe(
            tap(courses => dispatch(new GetUserCoursesSuccess(courses))),
            catchError(error => dispatch(new GetUserCoursesFailed(error)))
        );
    }

    @Action(GetUserCoursesSuccess)
    getUserCoursesSuccess(
        { patchState }: StateContext<Courses>,
        { courses }: GetUserCoursesSuccess
    ) {
        patchState({
            myCourses: courses
        })

    }

    @Action(GetCourses)
    getCourses({ dispatch }: StateContext<Courses>, action: GetCourses) {
        return this.dashboardService.getCourses().pipe(
            tap(courses => dispatch(new GetCoursesSuccess(courses))),
            catchError(error => dispatch(new GetCoursesFailed(error)))
        );
    }

    @Action(GetCoursesSuccess)
    getCoursesSuccess(
        { patchState }: StateContext<Courses>,
        { courses }: GetCoursesSuccess
    ) {
        patchState({
            allCourses: courses
        });

    }

    @Action(GetCourse)
    getCourse({ dispatch }: StateContext<Courses>, { courseId }: GetCourse) {
        return this.dashboardService.getCourse(courseId).pipe(
            tap(course => dispatch(new GetCourseSuccess(course))),
            catchError(error => dispatch(new GetCourseFailed(error)))
        );
    }

    @Action(GetCourseSuccess)
    getCourseSuccess(
        { patchState }: StateContext<Courses>,
        { course }: GetCourseSuccess
    ) {
        patchState({
            course: { ...course }
        });

    }

    @Action(SearchCourses)
    searchCourses({ dispatch }: StateContext<Courses>, { searchRequest }: SearchCourses) {
        return this.dashboardService.searchCourses(searchRequest).pipe(
            tap(courses => dispatch(new SearchCoursesSuccess(courses))),
            catchError(error => dispatch(new SearchCoursesFailed(error)))
        );
    }

    @Action(SearchCoursesSuccess)
    searchCoursesSuccess(
        { patchState }: StateContext<Courses>,
        { courses }: SearchCoursesSuccess
    ) {
        patchState({
            allCourses: courses
        });

    }



    @Action(AddCourse)
    addCourse({ dispatch }: StateContext<Courses>, { courseRequest }: AddCourse) {
        return this.dashboardService.addCourse(courseRequest).pipe(
            tap(course => dispatch(new AddCourseSuccess(course))),
            catchError(error => dispatch(new AddCourseFailed(error)))
        );
    }

    @Action(AddCourseSuccess)
    addCourseSuccess(
        { patchState, getState, dispatch }: StateContext<Courses>,
        { course }: AddCourseSuccess
    ) {
        patchState({
            myCourses: [...getState().myCourses, course],
            allCourses: [...getState().allCourses, course]
        });
    }

    @Action(DeleteCourse)
    deleteCourse({ dispatch }: StateContext<Courses>, { courseId }: DeleteCourse) {
        return this.dashboardService.deleteCourse(courseId).pipe(
            tap(() => dispatch(new DeleteCourseSuccess(courseId))),
            catchError(error => dispatch(new DeleteCourseFailed(error)))
        );
    }

    @Action(DeleteCourseSuccess)
    deleteCourseSuccess(
        { patchState, getState }: StateContext<Courses>,
        { courseId }: DeleteCourseSuccess
    ) {
        patchState({
            myCourses: getState().myCourses.filter(course => (course.course_id != courseId)),
            allCourses: getState().allCourses.filter(course => (course.course_id != courseId))
        })
    }

    @Action(EditCourse)
    editCourse({ dispatch }: StateContext<Courses>, { courseRequest, courseId }: EditCourse) {
        return this.dashboardService.editCourse(courseRequest, courseId).pipe(
            tap(() => dispatch(new EditCourseSuccess(courseRequest, courseId))),
            catchError(error => dispatch(new EditCourseFailed(error)))
        );
    }

    @Action(EditCourseSuccess)
    editCourseSuccess(
        { patchState, getState }: StateContext<Courses>,
        { courseRequest, courseId }: EditCourseSuccess
    ) {
        patchState({
            myCourses: getState().myCourses.map(course => {
                if (course.course_id == courseId) {
                    {
                        return {
                            ...course,
                            title: courseRequest.title,
                            description: courseRequest.description
                        }
                    }
                }
                return course;
            }),
            allCourses: getState().allCourses.map(course => {
                if (course.course_id == courseId) {
                    {
                        return {
                            ...course,
                            title: courseRequest.title,
                            description: courseRequest.description
                        }
                    }
                }
                return course;
            })
        });
    }

    @Action(SubscribeCourse)
    subscribeCourse({ dispatch }: StateContext<Courses>, { courseId }: SubscribeCourse) {



        return this.dashboardService.subscribeCourse(courseId).pipe(
            tap(() => dispatch(new SubscribeCourseSuccess(courseId))),
            catchError(error => dispatch(new SubscribeCourseFailed(error)))
        );
    }

    @Action(SubscribeCourseSuccess)
    subscribeCourseSuccess(
        { dispatch, patchState, getState }: StateContext<Courses>,
        { courseId }: SubscribeCourseSuccess
    ) {
        const [newCourse] = getState().allCourses.filter(course => (course.course_id == courseId))
        patchState({
            myCourses: [...getState().myCourses, newCourse]
        });
        dispatch(new Navigate(['/resources/', courseId]));
    }


    @Action(UnsubscribeCourse)
    unsubscribeCourse({ dispatch }: StateContext<Courses>, { courseId }: UnsubscribeCourse) {

        return this.dashboardService.unsubscribeCourse(courseId).pipe(
            tap(() =>
                dispatch(new UnsubscribeCourseSuccess(courseId))
            ),
            catchError(error => dispatch(new UnsubscribeCourseFailed(error)))
        );
    }

    @Action(UnsubscribeCourseSuccess)
    unsubscribeCourseSuccess(
        { patchState, getState, dispatch }: StateContext<Courses>,
        { courseId }: UnsubscribeCourseSuccess
    ) {
        patchState({
            myCourses: getState().myCourses.filter(course => (course.course_id !== courseId))
        });
    }

    @Action(Logout)
    logout({ setState, dispatch }: StateContext<Courses>) {
        this.authService.logout();
        setState({
            myCourses: [],
            allCourses: [],
            course: null,
        });
    }

    @Action([GetUserCoursesFailed, GetCoursesFailed, AddCourseFailed, SearchCoursesFailed, DeleteCourseFailed, EditCourseFailed, GetCourseFailed, SubscribeCourseFailed,
        UnsubscribeCourseFailed])
    error({ dispatch }: StateContext<Course[]>, { error }: any) {
        dispatch(new SetErrors(error));
        console.log(error);
    }

}

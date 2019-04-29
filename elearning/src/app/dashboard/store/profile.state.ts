import { State, Store, StateContext, Action } from '@ngxs/store';
import { DashboardService } from '../services/dashboard.service';
import { tap, catchError } from 'rxjs/operators';
import { Profile } from 'src/app/auth/auth.models';
import { GetCourseUsersFailed, GetCourseUsers, GetCourseUsersSuccess } from './profile.actions';
import { SetErrors } from 'src/app/error/store/error.actions';
import { Logout } from 'src/app/auth/store/auth.actions';
import { AuthService } from 'src/app/auth/services/auth.service';


@State<Profile[]>({
    name: 'users',
    defaults: []
})

export class ProfileState {

    constructor(private store: Store, private dashboardService: DashboardService, private authService: AuthService) { }

    @Action(GetCourseUsers)
    getCourseUsers({ dispatch }: StateContext<Profile[]>, { courseId }: GetCourseUsers) {
        return this.dashboardService.getCourseUsers(courseId).pipe(
            tap(users =>
                dispatch(new GetCourseUsersSuccess(users))
            ),
            catchError(error => dispatch(new GetCourseUsersFailed(error)))
        );
    }

    @Action(GetCourseUsersSuccess)
    getCourseUsersSuccess(
        { setState }: StateContext<Profile[]>,
        { users }: GetCourseUsersSuccess
    ) {
        setState(users);
    }

    @Action(Logout)
    logout({ setState, dispatch }: StateContext<Profile[]>) {
        this.authService.logout();
        setState([]);
    }

    @Action([
        GetCourseUsersFailed
    ])
    error({ dispatch }: StateContext<Profile>, { error }: any) {
        dispatch(new SetErrors(error));
        console.log(error);
    }
}
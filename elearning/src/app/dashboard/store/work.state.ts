import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { DashboardService } from '../services/dashboard.service';
import { tap, catchError } from 'rxjs/operators';
import { SetErrors } from 'src/app/error/store/error.actions';
import { Work } from '../dashboard.models';
import { SendWorkFailed, SendWork, SendWorkSuccess, GetWorksFailed, GetWorks, GetWorksSuccess } from './work.actions';
import { Logout } from 'src/app/auth/store/auth.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Navigate } from '@ngxs/router-plugin';

@State<Work>({
    name: 'work',
    defaults: null
})

export class WorkState {

    constructor(private store: Store, private dashboardService: DashboardService, private authService: AuthService) { }



    @Action(SendWork)
    sendWork({ dispatch }: StateContext<Work>, { courseId, workRequest }: SendWork) {
        return this.dashboardService.sendWork(workRequest, courseId).pipe(
            tap(() =>
                dispatch(new SendWorkSuccess())
            ),
            catchError(error => dispatch(new SendWorkFailed(error)))
        );
    }

    @Action(SendWorkSuccess)
    sendWorkSuccess() { }

    @Action(GetWorks)
    getWorks({ dispatch }: StateContext<Work>, { courseId }: GetWorks) {
        return this.dashboardService.getWorks(courseId).pipe(
            tap(response => dispatch(new GetWorksSuccess(response, courseId))),
            catchError(error => dispatch(new GetWorksFailed(error)))
        );

    }

    @Action(GetWorksSuccess)
    getWorksSuccess({ setState, getState }: StateContext<Work>,
        { response, courseId }: GetWorksSuccess
    ) {

        setState({
            courseId,
            url: response.headers.get('Location')
        })
    }

    @Action(Logout)
    logout({ setState, dispatch }: StateContext<Work>) {
        this.authService.logout();
        setState(null);
    }

    @Action([
        SendWorkFailed, GetWorksFailed
    ])
    error({ dispatch }: StateContext<Work>, { error }: any) {
        dispatch(new SetErrors(error));
        console.log(error);
    }

}
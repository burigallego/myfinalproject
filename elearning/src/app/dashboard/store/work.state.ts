import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { DashboardService } from '../services/dashboard.service';
import { tap, catchError } from 'rxjs/operators';
import { SetErrors } from 'src/app/error/store/error.actions';
import { Work } from '../dashboard.models';
import { SendWorkFailed, SendWork, SendWorkSuccess, GetWorksFailed, GetWorks, GetWorksSuccess } from './work.actions';

@State<Work>({
    name: 'work',
    defaults: null
})

export class WorkState {

    constructor(private store: Store, private dashboardService: DashboardService) { }



    @Action(SendWork)
    sendWork({ dispatch }: StateContext<Work>, { courseId, workRequest }: SendWork) {
        return this.dashboardService.sendWork(workRequest, courseId).pipe(
            tap(() =>
                dispatch(new SendWorkSuccess())
            ),
            catchError(error => dispatch(new SendWorkFailed(error.error)))
        );
    }

    @Action(SendWorkSuccess)
    sendWorkSuccess() { }

    @Action(GetWorks)
    getWorks({ dispatch }: StateContext<Work>, { courseId }: GetWorks) {
        return this.dashboardService.getWorks(courseId).pipe(
            tap(response => dispatch(new GetWorksSuccess(response, courseId))),
            catchError(error => dispatch(new GetWorksFailed(error.error)))
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

    @Action([
        SendWorkFailed, GetWorksFailed
    ])
    error({ dispatch }: StateContext<Work>, { errors }: any) {
        dispatch(new SetErrors(errors));
        console.log(errors);
    }

}
import { State, Action, StateContext, Store } from '@ngxs/store';
import { SetErrors, ResetErrors, GoErrorPages } from './error.actions';
import { Logout, DeleteToken } from 'src/app/auth/store/auth.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Navigate } from '@ngxs/router-plugin';
// import { Error }from '../error.models'

@State<Error>({
    name: 'error',
    defaults: null
})

export class ErrorState {

    constructor(private store: Store, private authService: AuthService) { }

    @Action(SetErrors)
    setErrors({ setState, dispatch }: StateContext<Error>, { error }: SetErrors) {
        setState(error);

    }

    @Action(ResetErrors)
    reset({ setState }: StateContext<Error>) {
        setState(null);

    }

    @Action(GoErrorPages)
    goErrorPages({ setState, dispatch }: StateContext<Error>, { error }: GoErrorPages) {
        setState(error);
        if (error.status == 401) {
            dispatch(new DeleteToken());
            dispatch(new ResetErrors())
        } else if (error.status == 412) {
            console.log(error.error);
        } else {
            dispatch(new Navigate(['/errors', error.status]));

        }

    }

    @Action(Logout)
    logout({ setState, dispatch }: StateContext<Error>) {
        this.authService.logout();
        setState(null);
    }

}

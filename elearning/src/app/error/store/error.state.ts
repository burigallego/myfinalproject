import { State, Action, StateContext, Store } from '@ngxs/store';
import { SetErrors, ResetErrors } from './error.actions';
import { Logout, DeleteToken } from 'src/app/auth/store/auth.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
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
        if (error.status == 401) {
            this.store.dispatch(new ResetErrors());
            this.store.dispatch(new DeleteToken());
        }
    }

    @Action(ResetErrors)
    reset({ setState }: StateContext<Error>) {
        setState(null);

    }

    @Action(Logout)
    logout({ setState, dispatch }: StateContext<Error>) {
        this.authService.logout();
        setState(null);
    }

}

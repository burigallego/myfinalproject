import { State, Action, StateContext } from '@ngxs/store';
import { SetErrors, ResetErrors } from './error.actions';
import { Error } from '../error.models'

@State<Error[]>({
    name: 'errors',
    defaults: []
})

export class ErrorState {

    @Action(SetErrors)
    setErrors({ setState }: StateContext<Error[]>, { errors }: SetErrors) {
        setState(errors);
    }

    @Action(ResetErrors)
    reset({ setState }: StateContext<Error[]>) {
        setState([]);
    }
}

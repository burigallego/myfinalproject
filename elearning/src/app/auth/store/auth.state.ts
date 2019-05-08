import { State, Store, StateContext, Action } from '@ngxs/store';
import { Auth } from '../auth.models';
import { AuthService } from '../services/auth.service';
import {
    Login,
    LoginSuccess,
    LoginFailed,
    RegisterFailed,
    Register,
    RegisterSuccess,
    GetUserProfileFailed,
    GetUserProfileSuccess,
    GetUserProfile,
    Logout,
    UpdateUserProfile,
    UpdateUserProfileSuccess,
    UpdateUserProfileFailed,
    UploadAvatarFailed,
    UploadAvatar,
    UploadAvatarSuccess,
    DeleteToken,
    ActivateAccountFailed,
    ActivateAccount,
    ActivateAccountSuccess,

} from './auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { tap, catchError } from 'rxjs/operators';
import { SetErrors, GoErrorPages } from 'src/app/error/store/error.actions';
import { GetCourses } from 'src/app/dashboard/store/course.actions';

@State<Auth>({
    name: 'auth',
    defaults: {
        ...JSON.parse(localStorage.getItem('auth'))
    }
})
export class AuthState {
    constructor(private store: Store, private authService: AuthService) { }

    @Action(Login, { cancelUncompleted: true })
    login({ dispatch }: StateContext<Auth>, action: Login) {
        return this.authService.login(action.login).pipe(
            tap(data => dispatch(new LoginSuccess(data))),
            catchError(error => dispatch(new LoginFailed(error)))
        );
    }

    @Action(LoginSuccess)
    loginSuccess(
        { patchState, dispatch }: StateContext<Auth>,
        { loginResponse }: LoginSuccess
    ) {
        patchState({ ...loginResponse });

        dispatch(new Navigate(['/wall']));
    }


    @Action(Register)
    register({ dispatch }: StateContext<Auth>, action: Register) {
        return this.authService.register(action.register).pipe(
            tap(() => dispatch(new RegisterSuccess())),
            catchError(error => dispatch(new RegisterFailed(error)))
        );
    }

    @Action(GetUserProfile)
    getUserProfile({ dispatch }: StateContext<Auth>) {
        return this.authService.getUserProfile().pipe(
            tap(profileResponse =>
                dispatch(new GetUserProfileSuccess(profileResponse))
            ),
            catchError(error => dispatch(new GetUserProfileFailed(error)))
        );
    }

    @Action(GetUserProfileSuccess)
    getUserProfileSuccess(
        { patchState }: StateContext<Auth>,
        { profile }: GetUserProfileSuccess
    ) {
        patchState({ ...profile });
    }




    @Action(Logout)
    logout({ setState, dispatch }: StateContext<Auth>) {
        this.authService.logout();
        setState(null);
        dispatch(new Navigate(['/welcome']));
    }



    @Action(RegisterSuccess)
    registerSuccess(ctx: StateContext<Auth>) { }

    @Action(UpdateUserProfile, { cancelUncompleted: true })
    updateUserProfile(
        { dispatch }: StateContext<Auth>,
        { profile }: UpdateUserProfile
    ) {
        return this.authService.updateUserProfile(profile).pipe(
            tap(() => dispatch(new UpdateUserProfileSuccess(profile))),
            catchError(error => dispatch(new UpdateUserProfileFailed(error)))
        );
    }

    @Action(UpdateUserProfileSuccess)
    updateUserProfileSuccess(
        { patchState }: StateContext<Auth>,
        { profile }: UpdateUserProfileSuccess
    ) {
        patchState({
            ...profile
        });
    }

    @Action(UploadAvatar)
    uploadAvatar(
        { dispatch }: StateContext<Auth>,
        { image }: UploadAvatar
    ) {
        return this.authService.uploadAvatar(image).pipe(
            tap(response => dispatch(new UploadAvatarSuccess(response))),
            catchError(error => dispatch(new UploadAvatarFailed(error)))
        );
    }

    @Action(UploadAvatarSuccess)
    uploadAvatarSuccess(
        { patchState }: StateContext<Auth>,
        { response }: UploadAvatarSuccess
    ) {
        patchState({
            avatarUrl: response.headers.get('Location')
        });
    }

    @Action(ActivateAccount)
    activateAccount(
        { dispatch }: StateContext<Auth>,
        { verificationCode }: ActivateAccount
    ) {
        return this.authService.activateAccount(verificationCode).pipe(
            tap(() => dispatch(new ActivateAccountSuccess())),
            catchError(error => dispatch(new ActivateAccountFailed(error)))
        );
    }

    @Action(ActivateAccountSuccess)
    activateAccountSuccess() {

    }

    @Action(DeleteToken)
    deleteToken({ patchState }: StateContext<Auth>) {
        patchState(
            {
                accessToken: null
            }
        )
    }

    @Action([
        GetUserProfileFailed,
        UpdateUserProfileFailed,
        UploadAvatarFailed,
        ActivateAccountFailed
    ])
    goError({ dispatch }: StateContext<Auth>, { error }: any) {
        dispatch(new GoErrorPages(error));
        console.log(error)
    }

    @Action([
        LoginFailed,
        RegisterFailed,

    ])
    error({ dispatch }: StateContext<Auth>, { error }: any) {
        dispatch(new SetErrors(error));
        console.log(error);
    }


}

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    Profile,
    Auth
} from '../auth.models';

// import { Error }from 'src/app/error/error.models';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public login: LoginRequest) { }
}

export class LoginSuccess {
    static readonly type = '[Auth] LoginSuccess';
    constructor(public loginResponse: LoginResponse) { }
}

export class LoginFailed {
    static type = '[Auth] LoginFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class Register {
    static readonly type = '[Auth] Register';
    constructor(public register: RegisterRequest) { }
}

export class RegisterSuccess {
    static readonly type = '[Auth] RegisterSuccess';
}

export class RegisterFailed {
    static type = '[Auth] RegisterFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class GetUserProfile {
    static readonly type = '[Auth] GetUserProfile';
}

export class GetUserProfileSuccess {
    static readonly type = '[Auth] GetUserProfileSuccess';
    constructor(public profile: Auth) { }
}

export class GetUserProfileFailed {
    static type = '[Auth] GetUserProfileFailed';
    constructor(public error: HttpErrorResponse) { }
}


export class UpdateUserProfile {
    static readonly type = '[Auth] UpdateUserProfile';
    constructor(public profile: Profile) { }
}

export class UpdateUserProfileSuccess {
    static readonly type = '[Auth] UpdateUserProfileSuccess';
    constructor(public profile: Profile) { }
}

export class UpdateUserProfileFailed {
    static type = '[Auth] UpdateUserProfileFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class UploadAvatar {
    static readonly type = '[Auth] UploadAvatar';
    constructor(public image: File) { }
}

export class UploadAvatarSuccess {
    static readonly type = '[Auth] UploadAvatarSuccess';
    constructor(public response: HttpResponse<any>) { }
}

export class UploadAvatarFailed {
    static type = '[Auth] UploadAvatarFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class ActivateAccount {
    static readonly type = '[Auth] ActivateAccount';
    constructor(public verificationCode: string) { }
}

export class ActivateAccountSuccess {
    static readonly type = '[Auth] ActivateAccountSuccess';
}

export class ActivateAccountFailed {
    static type = '[Auth] ActivateAccountFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class DeleteToken {
    static type = '[Auth] DeleteToken';
}

export class Logout {
    static type = '[Auth] Logout';
}

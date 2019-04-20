import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    Profile,
    Auth,
    CourseCreator
} from '../auth.models';
import { Error } from 'src/app/error/error.models';
import { HttpResponse } from '@angular/common/http';

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
    constructor(public errors: Error[]) { }
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
    constructor(public errors: Error[]) { }
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
    constructor(public errors: Error[]) { }
}

export class SubscribeCourse {
    static readonly type = '[Auth] SubscribeCourse';
    constructor(public courseId: number) { }
}

export class SubscribeCourseSuccess {
    static readonly type = '[Auth] SubscribeCourseSuccess';
    constructor(public courseId: number, public courseCreator: CourseCreator) { }
}

export class SubscribeCourseFailed {
    static type = '[Auth] SubscribeCourseFailed';
    constructor(public errors: Error[]) { }
}

export class UnsubscribeCourse {
    static readonly type = '[Auth] UnsubscribeCourse';
    constructor(public courseId: number) { }
}

export class UnsubscribeCourseSuccess {
    static readonly type = '[Auth] UnsubscribeCourseSuccess';
    constructor(public courseCreator: CourseCreator) { }
}

export class UnsubscribeCourseFailed {
    static type = '[Auth] UnsubscribeCourseFailed';
    constructor(public errors: Error[]) { }
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
    constructor(public errors: Error[]) { }
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
    constructor(public errors: Error[]) { }
}
export class Logout {
    static type = '[Auth] Logout';
}

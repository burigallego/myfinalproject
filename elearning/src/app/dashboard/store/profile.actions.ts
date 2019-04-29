// import { Error }from 'src/app/error/error.models';
import { Profile } from 'src/app/auth/auth.models';
import { HttpErrorResponse } from '@angular/common/http';


export class GetCourseUsers {
    static readonly type = '[Auth] GetCourseUsers';
    constructor(public courseId: number) { }
}

export class GetCourseUsersSuccess {
    static readonly type = '[Auth] GetCourseUsersSuccess';
    constructor(public users: Profile[]) { }
}

export class GetCourseUsersFailed {
    static type = '[Auth] GetCourseUsersFailed';
    constructor(public error: HttpErrorResponse) { }
}
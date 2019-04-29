// import { Error }from 'src/app/error/error.models';
import { Course, CourseRequest, SearchRequest } from '../dashboard.models';
import { HttpErrorResponse } from '@angular/common/http';

export class GetUserCourses {
    static readonly type = '[Dashboard] GetUserCourses';
}

export class GetUserCoursesSuccess {
    static readonly type = '[Dashboard] GetUserCoursesSuccess';
    constructor(public courses: Course[]) { }
}

export class GetUserCoursesFailed {
    static type = '[Dashboard] GetUserCoursesFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class GetCourses {
    static readonly type = '[Dashboard] GetCourses';
}

export class GetCoursesSuccess {
    static readonly type = '[Dashboard] GetCoursesSuccess';
    constructor(public courses: Course[]) { }
}

export class GetCoursesFailed {
    static type = '[Dashboard] GetCoursesFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class GetCourse {
    static readonly type = '[Dashboard] GetCourse';
    constructor(public courseId: number) { }
}

export class GetCourseSuccess {
    static readonly type = '[Dashboard] GetCourseSuccess';
    constructor(public course: Course) { }
}

export class GetCourseFailed {
    static type = '[Dashboard] GetCourseFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class SearchCourses {
    static readonly type = '[Dashboard] SearchCourses';
    constructor(public searchRequest: SearchRequest) { }
}

export class SearchCoursesSuccess {
    static readonly type = '[Dashboard] SearchCoursesSuccess';
    constructor(public courses: Course[]) { }
}

export class SearchCoursesFailed {
    static type = '[Dashboard] GetCoursesFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class AddCourse {
    static readonly type = '[Dashboard] AddCourse';
    constructor(public courseRequest: CourseRequest) { }
}

export class AddCourseSuccess {
    static readonly type = '[Dashboard] AddCourseSuccess';
    constructor(public course: Course) { }
}

export class AddCourseFailed {
    static type = '[Dashboard] AddCourseFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class DeleteCourse {
    static readonly type = '[Dashboard] DeleteCourse';
    constructor(public courseId: number) { }
}

export class DeleteCourseSuccess {
    static readonly type = '[Dashboard] DeleteCourseSuccess';
    constructor(public courseId: number) { }
}

export class DeleteCourseFailed {
    static type = '[Dashboard] DeleteCourseFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class EditCourse {
    static readonly type = '[Dashboard] EditCourse';
    constructor(public courseRequest: CourseRequest, public courseId: number) { }
}

export class EditCourseSuccess {
    static readonly type = '[Dashboard] EditCourseSuccess';
    constructor(public courseRequest: CourseRequest, public courseId: number) { }
}

export class EditCourseFailed {
    static type = '[Dashboard] EditCourseFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class SubscribeCourse {
    static readonly type = '[Auth] SubscribeCourse';
    constructor(public courseId: number) { }
}

export class SubscribeCourseSuccess {
    static readonly type = '[Auth] SubscribeCourseSuccess';
    constructor(public courseId: number) { }
}

export class SubscribeCourseFailed {
    static type = '[Auth] SubscribeCourseFailed';
    constructor(public error: HttpErrorResponse) { }
}

export class UnsubscribeCourse {
    static readonly type = '[Auth] UnsubscribeCourse';
    constructor(public courseId: number) { }
}

export class UnsubscribeCourseSuccess {
    static readonly type = '[Auth] UnsubscribeCourseSuccess';
    constructor(public courseId: number) { }
}

export class UnsubscribeCourseFailed {
    static type = '[Auth] UnsubscribeCourseFailed';
    constructor(public error: HttpErrorResponse) { }
}
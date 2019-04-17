import { Error } from 'src/app/error/error.models';
import { Course } from '../dashboard.models';

export class GetUserCourses {
    static readonly type = '[Dashboard] GetUserCourses';
}

export class GetUserCoursesSuccess {
    static readonly type = '[Dashboard] GetUserCoursesSuccess';
    constructor(public courses: Course[]) { }
}

export class GetUserCoursesFailed {
    static type = '[Dashboard] GetUserCoursesFailed';
    constructor(public errors: Error[]) { }
}
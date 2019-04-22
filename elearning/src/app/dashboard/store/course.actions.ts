import { Error } from 'src/app/error/error.models';
import { Course, CourseRequest, SearchRequest } from '../dashboard.models';

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

export class GetCourses {
    static readonly type = '[Dashboard] GetCourses';
}

export class GetCoursesSuccess {
    static readonly type = '[Dashboard] GetCoursesSuccess';
    constructor(public courses: Course[]) { }
}

export class GetCoursesFailed {
    static type = '[Dashboard] GetCoursesFailed';
    constructor(public errors: Error[]) { }
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
    constructor(public errors: Error[]) { }
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
    constructor(public errors: Error[]) { }
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
    constructor(public errors: Error[]) { }
}
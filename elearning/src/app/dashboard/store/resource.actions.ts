import { Error } from 'src/app/error/error.models';
import { Resource } from '../dashboard.models';



export class GetCourseResources {
    static readonly type = '[Dashboard] GetCourseResources';
    constructor(public courseId: number) { }
}

export class GetCourseResourcesSuccess {
    static readonly type = '[Dashboard] GetCourseResourcesSuccess';
    constructor(public resources: Resource[]) { }
}

export class GetCourseResourcesFailed {
    static type = '[Dashboard] GetCourseResourcesFailed';
    constructor(public errors: Error[]) { }
}
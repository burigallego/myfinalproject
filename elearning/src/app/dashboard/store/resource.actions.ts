import { Error } from 'src/app/error/error.models';
import { Resource, LinkRequest, FileRequest } from '../dashboard.models';



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

export class CreateLink {
    static readonly type = '[Dashboard] CreateLink';
    constructor(public linkRequest: LinkRequest, public courseId: number) { }
}

export class CreateLinkSuccess {
    static readonly type = '[Dashboard] CreateLinkSuccess';
    constructor(public resource: Resource) { }
}

export class CreateLinkFailed {
    static type = '[Dashboard] CreateLinkFailed';
    constructor(public errors: Error[]) { }
}

export class CreateFile {
    static readonly type = '[Dashboard] CreateFile';
    constructor(public fileRequest: FileRequest, public courseId: number) { }
}

export class CreateFileSuccess {
    static readonly type = '[Dashboard] CreateFileSuccess';
    constructor(public resource: Resource) { }
}

export class CreateFileFailed {
    static type = '[Dashboard] CreateFileFailed';
    constructor(public errors: Error[]) { }
}
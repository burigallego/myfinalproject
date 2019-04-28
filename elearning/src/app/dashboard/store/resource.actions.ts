import { Error } from 'src/app/error/error.models';
import { Resource, LinkRequest, FileRequest, ResourceRequest } from '../dashboard.models';



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

export class DeleteLink {
    static readonly type = '[Dashboard] DeleteLink';
    constructor(public resourceId: number, public courseId: number) { }
}

export class DeleteLinkSuccess {
    static readonly type = '[Dashboard] DeleteLinkSuccess';
    constructor(public resourceId: number) { }
}

export class DeleteLinkFailed {
    static type = '[Dashboard] DeleteLinkFailed';
    constructor(public errors: Error[]) { }
}

export class DeleteFile {
    static readonly type = '[Dashboard] DeleteFile';
    constructor(public resourceId: number, public courseId: number, public publicId: string) { }
}

export class DeleteFileSuccess {
    static readonly type = '[Dashboard] DeleteFileSuccess';
    constructor(public resourceId: number) { }
}

export class DeleteFileFailed {
    static type = '[Dashboard] DeleteLinkFailed';
    constructor(public errors: Error[]) { }
}

export class EditResource {
    static readonly type = '[Dashboard] EditResource';
    constructor(public resourceRequest: ResourceRequest, public resourceId: number) { }
}

export class EditResourceSuccess {
    static readonly type = '[Dashboard] EditResourceSuccess';
    constructor(public resourceRequest: ResourceRequest, public resourceId: number) { }
}

export class EditResourceFailed {
    static type = '[Dashboard] EditResourceFailed';
    constructor(public errors: Error[]) { }
}



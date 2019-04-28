import { Error } from 'src/app/error/error.models';
import { WorkRequest } from '../dashboard.models';
import { HttpResponse } from '@angular/common/http';


export class SendWork {
    static readonly type = '[Dashboard] SendWork';
    constructor(public workRequest: WorkRequest, public courseId: number) { }
}

export class SendWorkSuccess {
    static readonly type = '[Dashboard] SendWorkSuccess';
}

export class SendWorkFailed {
    static type = '[Dashboard] SendWorkFailed';
    constructor(public errors: Error[]) { }
}

export class GetWorks {
    static readonly type = '[Dashboard] GetWorks';
    constructor(public courseId: number) { }
}

export class GetWorksSuccess {
    static readonly type = '[Dashboard] GetWorksSuccess';
    constructor(public response: HttpResponse<any>, public courseId: number) { }

}

export class GetWorksFailed {
    static type = '[Dashboard] GetWorksFailed';
    constructor(public errors: Error[]) { }
}
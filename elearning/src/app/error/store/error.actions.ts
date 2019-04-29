import { HttpErrorResponse } from '@angular/common/http';

// import { Error }from '../error.models';


export class SetErrors {
    static readonly type = '[Error] Set';
    constructor(public error: HttpErrorResponse) { }
}

export class ResetErrors {
    static readonly type = '[Error] Reset';
}

import { State, Store, StateContext, Action } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { GetCourseResources, GetCourseResourcesSuccess, GetCourseResourcesFailed, CreateLinkFailed, CreateLink, CreateLinkSuccess, CreateFileFailed, CreateFile, CreateFileSuccess, DeleteLinkFailed, DeleteLink, DeleteLinkSuccess, DeleteFileFailed, DeleteFile, DeleteFileSuccess, EditResourceFailed, EditResource, EditResourceSuccess } from './resource.actions';
import { Resource } from '../dashboard.models';
import { SetErrors } from 'src/app/error/store/error.actions';


@State<Resource[]>({
    name: 'resources',
    defaults: []
})

export class ResourceState {
    constructor(private store: Store, private dashboardService: DashboardService) { }


    @Action(GetCourseResources)
    getCourseResources({ dispatch }: StateContext<Resource[]>, { courseId }: GetCourseResources) {
        return this.dashboardService.getCourseResources(courseId).pipe(
            tap(resources => dispatch(new GetCourseResourcesSuccess(resources))),
            catchError(error => dispatch(new GetCourseResourcesFailed(error.error)))
        );
    }

    @Action(GetCourseResourcesSuccess)
    getUserCoursesSuccess(
        { setState }: StateContext<Resource[]>,
        { resources }: GetCourseResourcesSuccess
    ) {
        setState(resources);

    }

    @Action(CreateLink)
    createLink({ dispatch }: StateContext<Resource[]>, { linkRequest, courseId }: CreateLink) {
        return this.dashboardService.createLink(linkRequest, courseId).pipe(
            tap(resource => dispatch(new CreateLinkSuccess(resource))),
            catchError(error => dispatch(new CreateLinkFailed(error.error)))
        );
    }

    @Action(CreateLinkSuccess)
    createLinkSuccess(
        { setState, getState }: StateContext<Resource[]>,
        { resource }: CreateLinkSuccess
    ) {
        setState([...getState(), resource]);
    }

    @Action(DeleteLink)
    deleteLink({ dispatch }: StateContext<Resource[]>, { resourceId, courseId }: DeleteLink) {
        return this.dashboardService.deleteLink(resourceId, courseId).pipe(
            tap(() => dispatch(new DeleteLinkSuccess(resourceId))),
            catchError(error => dispatch(new DeleteLinkFailed(error.error)))
        );
    }

    @Action(DeleteLinkSuccess)
    deleteLinkSuccess(
        { setState, getState }: StateContext<Resource[]>,
        { resourceId }: DeleteLinkSuccess
    ) {
        setState(getState().filter(item => (item.resource_id !== resourceId)));
    }

    @Action(DeleteFile)
    deleteFile({ dispatch }: StateContext<Resource[]>, { resourceId, courseId, publicId }: DeleteFile) {
        return this.dashboardService.deleteFile(resourceId, courseId, publicId).pipe(
            tap(() => dispatch(new DeleteFileSuccess(resourceId))),
            catchError(error => dispatch(new DeleteFileFailed(error.error)))
        );
    }

    @Action(DeleteFileSuccess)
    deleteFileSuccess(
        { setState, getState }: StateContext<Resource[]>,
        { resourceId }: DeleteFileSuccess
    ) {
        setState(getState().filter(item => (item.resource_id !== resourceId)));
    }

    @Action(CreateFile)
    createFile({ dispatch }: StateContext<Resource[]>, { fileRequest, courseId }: CreateFile) {
        return this.dashboardService.createFile(fileRequest, courseId).pipe(
            tap(resource => dispatch(new CreateFileSuccess(resource))),
            catchError(error => dispatch(new CreateFileFailed(error.error)))
        );
    }

    @Action(CreateFileSuccess)
    createFileSuccess(
        { setState, getState }: StateContext<Resource[]>,
        { resource }: CreateFileSuccess
    ) {
        setState([...getState(), resource]);
    }

    @Action(EditResource)
    editResource({ dispatch }: StateContext<Resource[]>, { resourceRequest, resourceId }: EditResource) {
        return this.dashboardService.editResource(resourceRequest, resourceId).pipe(
            tap(() => dispatch(new EditResourceSuccess(resourceRequest, resourceId))),
            catchError(error => dispatch(new EditResourceFailed(error.error)))
        );
    }

    @Action(EditResourceSuccess)
    editResourceSuccess(
        { setState, getState }: StateContext<Resource[]>,
        { resourceRequest, resourceId }: EditResourceSuccess
    ) {
        setState(getState().map(resource => {
            if (resource.resource_id == resourceId) {
                {
                    return {
                        ...resource,
                        resource_name: resourceRequest.resourceName,
                    }
                }
            }
            return resource;
        }));
    }






    @Action([GetCourseResourcesFailed, CreateLinkFailed, CreateFileFailed, DeleteLinkFailed, DeleteFileFailed, EditResourceFailed])
    error({ dispatch }: StateContext<Resource[]>, { errors }: any) {
        dispatch(new SetErrors(errors));
        console.log(errors);
    }
}
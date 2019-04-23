import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Resource, LinkRequest, FileRequest, CourseRequest, ResourceRequest } from '../dashboard.models';

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    constructor(private http: HttpClient) { }

    getUserCourses() {

        return this.http.get<Course[]>(`${environment.apiBaseUrl}/course/user`);
    }


    getCourses() {

        return this.http.get<Course[]>(`${environment.apiBaseUrl}/course`);
    }


    searchCourses({ q }) {
        const params = new HttpParams()
            .set('q', `${q}`);

        return this.http.get<Course[]>(`${environment.apiBaseUrl}/course/search`, { params });
    }

    addCourse({ title, description }) {
        return this.http.post<Course>(`${environment.apiBaseUrl}/course`, { title, description });
    }
    getCourseResources(courseId) {
        const params = new HttpParams()
            .set('courseId', `${courseId}`);

        return this.http.get<Resource[]>(`${environment.apiBaseUrl}/resource`, { params });
    }

    createLink({ url, resourceName }: LinkRequest, courseId) {
        const params = new HttpParams()
            .set('courseId', `${courseId}`);

        return this.http.post<Resource>(`${environment.apiBaseUrl}/resource/link`, { url, resourceName }, { params });
    }

    createFile({ resourceName, file }: FileRequest, courseId) {
        const params = new HttpParams()
            .set('courseId', `${courseId}`)
            .set('resourceName', `${resourceName}`);

        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<Resource>(`${environment.apiBaseUrl}/resource/file`, formData, { params });
    }

    deleteLink(resourceId, courseId) {
        const params = new HttpParams()
            .set('resourceId', `${resourceId}`)
            .set('courseId', `${courseId}`);

        return this.http.delete(`${environment.apiBaseUrl}/resource/link`, { params });
    }

    deleteFile(resourceId, courseId, publicId) {
        const params = new HttpParams()
            .set('resourceId', `${resourceId}`)
            .set('courseId', `${courseId}`)
            .set('publicId', `${publicId}`);

        return this.http.delete(`${environment.apiBaseUrl}/resource/file`, { params })
    }

    deleteCourse(courseId) {
        const params = new HttpParams()
            .set('courseId', `${courseId}`);

        return this.http.delete(`${environment.apiBaseUrl}/course`, { params })
    }

    editCourse({ title, description }: CourseRequest, courseId: number) {
        const params = new HttpParams()
            .set('courseId', `${courseId}`);

        return this.http.put(`${environment.apiBaseUrl}/course`, { title, description }, { params });
    }

    editResource({ resourceName }: ResourceRequest, resourceId: number) {
        const params = new HttpParams()
            .set('resourceId', `${resourceId}`);

        return this.http.put(`${environment.apiBaseUrl}/resource`, { resourceName }, { params });
    }
}


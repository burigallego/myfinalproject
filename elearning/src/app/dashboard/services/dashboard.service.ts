import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Resource, LinkRequest, FileRequest } from '../dashboard.models';

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

}
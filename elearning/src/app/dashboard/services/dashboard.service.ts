import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../dashboard.models';

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

    subscribeCourse(courseId) {
        const params = new HttpParams()
            .set('courseId', `${courseId}`);

        return this.http.get(`${environment.apiBaseUrl}/course/subscription`, { params });
    }

    searchCourses({ q }) {
        const params = new HttpParams()
            .set('q', `${q}`);

        return this.http.get<Course[]>(`${environment.apiBaseUrl}/course/search`, { params });
    }

    addCourse({ title, description }) {
        return this.http.post<Course>(`${environment.apiBaseUrl}/course`, { title, description });
    }
}
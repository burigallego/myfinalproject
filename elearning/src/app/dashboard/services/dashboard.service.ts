import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

    addCourse({ title, description }) {
        return this.http.post<Course>(`${environment.apiBaseUrl}/course`, { title, description });
    }
}
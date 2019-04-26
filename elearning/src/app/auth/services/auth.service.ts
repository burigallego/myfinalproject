import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { LoginRequest, LoginResponse, Auth, Profile } from '../auth.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login({ email, password }: LoginRequest) {
        return this.http
            .post<LoginResponse>(`${environment.apiBaseUrl}/account/login`, {
                email,
                password
            })
            .pipe(
                map(user => {
                    if (user && user.accessToken) {
                        const { accessToken, refreshToken } = user;
                        localStorage.setItem(
                            'auth',
                            JSON.stringify({ accessToken, refreshToken })
                        );
                    }
                    return user;
                })
            );
    }

    register({ fullName, email, password }) {
        return this.http.post(`${environment.apiBaseUrl}/account`, {
            fullName,
            email,
            password
        });
    }

    getUserProfile() {
        return this.http.get<Auth>(`${environment.apiBaseUrl}/user`);
    }

    updateUserProfile(profile: Profile) {
        return this.http.put<Profile>(`${environment.apiBaseUrl}/user`, profile);
    }

    uploadAvatar(image: File): Observable<HttpResponse<any>> {
        const formData = new FormData();

        formData.append('avatar', image);

        return this.http.post(`${environment.apiBaseUrl}/user/avatar`, formData, {
            observe: 'response'
        });
    }



    logout() {
        localStorage.removeItem('auth');
    }
}

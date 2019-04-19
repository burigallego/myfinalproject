import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { WallComponent } from './components/wall/wall.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { JwtInterceptor } from '../auth/services/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxsModule } from '@ngxs/store';
import { CourseState } from './store/course.state';
import { CreateCourseComponent } from './containers/create-course/create-course.component';
import { AllCoursesComponent } from './containers/all-courses/all-courses.component';
import { CourseComponent } from './components/course/course.component';
import { CardComponent } from './components/card/card.component';
import { ResourcesComponent } from './containers/resources/resources.component';
import { ResourceState } from './store/resource.state';


@NgModule({
  declarations: [DashboardComponent, WallComponent, MyAccountComponent, CreateCourseComponent, AllCoursesComponent, CourseComponent, CardComponent, ResourcesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    AuthModule,
    MatFileUploadModule,
    NgxsModule.forFeature([CourseState, ResourceState])

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class DashboardModule { }

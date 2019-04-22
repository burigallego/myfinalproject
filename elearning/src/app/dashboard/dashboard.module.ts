import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatDialogModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { WallComponent } from './components/wall/wall.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { JwtInterceptor } from '../auth/services/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { CourseState } from './store/course.state';
import { CreateCourseComponent } from './containers/create-course/create-course.component';
import { AllCoursesComponent } from './containers/all-courses/all-courses.component';
import { CourseComponent } from './components/course/course.component';
import { CardComponent } from './components/card/card.component';
import { ResourcesComponent } from './containers/resources/resources.component';
import { ResourceState } from './store/resource.state';
import { ResourceFormsComponent } from './components/resource-forms/resource-forms.component';
import { AddLinkComponent } from './containers/add-link/add-link.component';
import { AddFileComponent } from './containers/add-file/add-file.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { AuthState } from '../auth/store/auth.state';
import { ResourceComponent } from './components/resource/resource.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteCourseDialogComponent } from './containers/delete-course-dialog/delete-course-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [DashboardComponent, WallComponent, MyAccountComponent, CreateCourseComponent, AllCoursesComponent, CourseComponent, CardComponent, ResourcesComponent, ResourceFormsComponent, AddLinkComponent, AddFileComponent, ResourceComponent, DeleteCourseDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
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
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    MaterialFileInputModule,
    MatFileUploadModule,
    FontAwesomeModule,
    NgxsModule.forFeature([CourseState, ResourceState, AuthState])

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  entryComponents: [DeleteCourseDialogComponent],
})
export class DashboardModule { }

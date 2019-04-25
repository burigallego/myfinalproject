import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WallComponent } from './components/wall/wall.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { CreateCourseComponent } from './containers/create-course/create-course.component';
import { AllCoursesComponent } from './containers/all-courses/all-courses.component';
import { ResourcesComponent } from './containers/resources/resources.component';
import { StudentsComponent } from './containers/students/students.component';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'wall',
        component: WallComponent
      },
      {
        path: 'my_account',
        component: MyAccountComponent
      },
      {
        path: 'create_course',
        component: CreateCourseComponent
      },
      {
        path: 'all_courses',
        component: AllCoursesComponent
      },
      {
        path: 'resources/:courseId',
        component: ResourcesComponent
      },
      {
        path: 'students/:courseId',
        component: StudentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

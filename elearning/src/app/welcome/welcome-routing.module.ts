import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'user/:verificationCode',
    component: ActivateAccountComponent
  },
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomeFormsComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }

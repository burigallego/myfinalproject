import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { WelcomeMottoComponent } from './components/welcome-motto/welcome-motto.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomeRoutingModule } from './welcome-routing.module';



@NgModule({
  declarations: [WelcomeComponent, WelcomeMottoComponent, WelcomeFormsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }

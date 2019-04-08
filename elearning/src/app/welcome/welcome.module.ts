import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { WelcomeMottoComponent } from './components/welcome-motto/welcome-motto.component';

@NgModule({
  declarations: [WelcomeComponent, WelcomeFormsComponent, WelcomeMottoComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule
  ]
})
export class WelcomeModule { }

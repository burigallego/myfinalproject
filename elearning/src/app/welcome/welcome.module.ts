import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatInputModule, MatGridListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [WelcomeComponent, WelcomeFormsComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FontAwesomeModule,
    AuthModule
  ]
})
export class WelcomeModule { }

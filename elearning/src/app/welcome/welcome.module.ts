import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatInputModule, MatGridListModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from '../auth/auth.module';
import { ErrorModule } from '../error/error.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AuthState } from '../auth/store/auth.state';
import { NgxsModule } from '@ngxs/store';
import { ActivateAccountPopupComponent } from './containers/activate-account-popup/activate-account-popup.component';



@NgModule({
  declarations: [WelcomeComponent, WelcomeFormsComponent, ActivateAccountComponent, ActivateAccountPopupComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FontAwesomeModule,
    FlexLayoutModule,
    AuthModule,
    ErrorModule,
    NgxsModule.forFeature([AuthState]),
  ],
  entryComponents: [ActivateAccountPopupComponent],
})
export class WelcomeModule { }

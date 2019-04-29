import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
import { BackButtonComponent } from './containers/back-button/back-button.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from '../error/store/error.state';
import { ErrorsComponent } from './components/errors/errors.component';





@NgModule({
  declarations: [PageNotFoundComponent, ClickPreventDefaultDirective, BackButtonComponent, ErrorsComponent],
  imports: [
    CommonModule, FontAwesomeModule, RouterModule, MatGridListModule, MatButtonModule, NgxsModule.forFeature([ErrorState])
  ],
  exports: [ClickPreventDefaultDirective, PageNotFoundComponent, BackButtonComponent, ErrorsComponent]
})
export class SharedModule { }

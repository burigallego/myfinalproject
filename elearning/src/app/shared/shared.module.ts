import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
import { BackButtonComponent } from './containers/back-button/back-button.component';
import { MatButtonModule } from '@angular/material/button';





@NgModule({
  declarations: [PageNotFoundComponent, ClickPreventDefaultDirective, BackButtonComponent],
  imports: [
    CommonModule, FontAwesomeModule, RouterModule, MatGridListModule, MatButtonModule],
  exports: [ClickPreventDefaultDirective, PageNotFoundComponent, BackButtonComponent]
})
export class SharedModule { }

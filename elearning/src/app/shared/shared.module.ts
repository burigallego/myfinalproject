import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';




@NgModule({
  declarations: [PageNotFoundComponent, ClickPreventDefaultDirective],
  imports: [
    CommonModule, FontAwesomeModule, RouterModule, MatGridListModule],
  exports: [ClickPreventDefaultDirective, PageNotFoundComponent]
})
export class SharedModule { }

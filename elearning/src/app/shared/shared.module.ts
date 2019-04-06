import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule, FontAwesomeModule, RouterModule
  ],
  exports: [LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent]
})
export class SharedModule { }

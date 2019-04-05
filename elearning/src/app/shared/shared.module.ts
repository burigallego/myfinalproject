import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent],
  imports: [
    CommonModule, FontAwesomeModule
  ],
  exports: [LayoutComponent, LayoutHeaderComponent, LayoutFooterComponent]
})
export class SharedModule { }

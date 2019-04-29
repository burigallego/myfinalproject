import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from './store/error.state';
import { ErrorComponent } from './containers/error/error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxsModule.forFeature([ErrorState])
  ],
  exports: [ErrorComponent]
})
export class ErrorModule { }

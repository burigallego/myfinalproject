import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from './store/error.state';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([ErrorState])
  ]
})
export class ErrorModule { }

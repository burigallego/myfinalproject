import { Component, Input } from '@angular/core';

@Component({
  selector: 'el-avatar',
  template: `
    <img
      *ngIf="imageUrl"
      [src]="imageUrl"
      [ngStyle]="{ width: width, height: height, 'min-width': width }"
    />
  `,
  styles: [
    `
      img {
        border-radius: 50%;
      }
    `
  ]
})
export class AvatarComponent {


  @Input() imageUrl = '';


  @Input() width = 'auto';
  @Input() height = 'auto';
}


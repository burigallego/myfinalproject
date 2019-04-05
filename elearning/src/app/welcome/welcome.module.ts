import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeHeroComponent } from './components/welcome-hero/welcome-hero.component';

@NgModule({
  declarations: [WelcomeComponent, WelcomeHeroComponent],
  imports: [
    CommonModule
  ]
})
export class WelcomeModule { }

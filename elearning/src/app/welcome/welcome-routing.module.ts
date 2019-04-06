import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LayoutComponent } from '../shared/components/layout/layout.component';

const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'welcome',
                component: WelcomeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WelcomeRoutingModule { }

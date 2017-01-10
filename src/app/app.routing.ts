import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './404/404.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path : 'home', component: HomeComponent}, 
    {path : 'todo', loadChildren: 'app/todo-module/todo-module.module#TodoModuleModule'}, 
    {path : 'graphs', loadChildren: 'app/d3-module/d3-module.module#D3ModuleModule'},
    {path : '**' , component: ErrorComponent }   
    ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
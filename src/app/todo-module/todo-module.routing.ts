import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoModuleComponent } from './todo-module.component';

const routes: Routes = [
    {path: '', component: TodoModuleComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
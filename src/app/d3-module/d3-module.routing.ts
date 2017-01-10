import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { D3ModuleComponent } from './d3-module.component';
import { HourlyGraphComponent } from "./hourly-graph/hourly-graph.component";
import { DailyGraphComponent } from "./daily-graph/daily-graph.component";


const routes: Routes = [
    {path: '', component: D3ModuleComponent,
    children: [
      { path: '', redirectTo: 'd3-hourly', pathMatch: 'full' },
      { path: 'd3-daily', component: DailyGraphComponent }, 
      { path: 'd3-hourly', component: HourlyGraphComponent }
    ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
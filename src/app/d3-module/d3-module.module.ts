import { NgModule,Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3ModuleComponent } from './d3-module.component';
import { Http } from '@angular/http';

import { routing } from './d3-module.routing';
import { MaterialModule } from '@angular/material';
import { KwOutV3Service } from './service/kw3out.service';


import * as d3 from 'd3';
import { HourlyGraphComponent } from './hourly-graph/hourly-graph.component';
import { DailyGraphComponent } from './daily-graph/daily-graph.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MaterialModule
  ],
  declarations: [D3ModuleComponent, HourlyGraphComponent, DailyGraphComponent]
})
export class D3ModuleModule { }

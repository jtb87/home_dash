import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoModuleComponent } from './todo-module.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


/*Always import */
import { routing } from './todo-module.routing';
import { MaterialModule } from '@angular/material';

import { TodoApiService } from './service/todo-api.service';
import { StatusChangePipe } from './service/status-change.pipe';


@NgModule({
  imports: [
    routing,
    MaterialModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  declarations: [TodoModuleComponent,StatusChangePipe]
})
export class TodoModuleModule { }

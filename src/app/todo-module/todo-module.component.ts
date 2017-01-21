import { Component, OnInit } from '@angular/core';

import { TodoClass } from './service/todo';
import { StatusChangePipe } from './service/status-change.pipe';
import { TodoApiService } from './service/todo-api.service';



@Component({
  selector: 'app-todo-module',
  templateUrl: './todo-module.component.html',
  styleUrls: ['./todo-module.component.css'], 
  providers: [TodoApiService]
})
export class TodoModuleComponent implements OnInit {
  public todoVar:any = [{'status':'open', 'task':'FIX GET!'}]
  /*todoVar2:any = {task:"string",status:"open"}*/

  constructor(private _httpService:TodoApiService) { }

  getTodo(){
    this._httpService.todoGet()
    .subscribe(
      data => this.todoVar = data,
      error => this.todoVar = 'is not working'
      )
  }

  postData(){
    this._httpService.todoPost(this.todoVar)
    .subscribe()
    }
  

  onClickPost(val){
      console.log(this.todoVar)
      
      // push new value into array
      this.todoVar.push(
         new TodoClass(val)
        )
      console.log(this.todoVar)
      // post new value to back-end   
       this.postData()
       }

    status(val){
      let out =  new StatusChangePipe().transform(val)
      return out
    }

    isOpen(a){
      return "open" === a;
    }

    isClosed(a){
      return "closed" === a;
    }

    setClasses(val) {
    let classes =  {
      green: this.isOpen(val),
      red: this.isClosed(val),
      }
      
      return classes
    }

  ngOnInit() {
    this.getTodo()
  }

}
  

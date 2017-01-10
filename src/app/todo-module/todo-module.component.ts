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
/*uf_links:any = [{name:"Angular-cli resource",url:"https://www.sitepoint.com/ultimate-angular-cli-reference/"},{url:"https://keathmilligan.net/create-reusable-chart-components-with-angular-2-and-d3-js-version-4/",name:"Create Re-usable chart component"},
  {url:"https://scotch.io/tutorials/angular-2-http-requests-with-observables",name:"REST API calls angular2"},{url:"http://mean.expert/2016/05/02/angular-2-chart-component/",name:"Angular2 chart component"},{url:"http://stackoverflow.com/questions/37038467/how-to-implement-d3-in-angular-2",name:"Implement D3 with Angular 2"}
  ,{url:"http://blog.thoughtram.io/angular/2015/08/11/angular-2-template-syntax-demystified-part-1.html",name:"ang2 syntax"}, 
  
  {url:"https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps",name:"More about tokens (JWT)"},
  
  {url:"http://blog.angular-university.io/angular2-ngmodule/",name:"Angular2 modules explained"}
  
  ];*/
  
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
  

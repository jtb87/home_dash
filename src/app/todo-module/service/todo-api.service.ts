import { Injectable  } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class TodoApiService {

  constructor(private _http:Http) { }
  private todoUrl = 'http://192.168.1.10:437/todov1'
  // dev for dev purposes private todoUrl = 'http://127.0.0.1:5000/todov1'
  
   todoGet() {
    return this._http.get(this.todoUrl)
      .map(res => res.json())
    }

   todoPost(body:any) {
    let headers = new Headers({'content-type':'application/json'})
    let options = new RequestOptions({headers: headers})
    let bodyString = JSON.stringify(body)

    return this._http.post(this.todoUrl,body,options)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'server error'));
}
}
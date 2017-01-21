import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable'


import 'rxjs/add/operator/catch';


//model for stream data 
import { KwModel } from './kw-model'; 


 
@Injectable()
export class KwOutV3Service {


  stream_api:string = "http://192.168.1.10:437/kw_output_v2/10"
  daily_api:string = 'http://192.168.1.10:437/kw_output_v3/7'
  hourly_api:string = 'http://192.168.1.10:437/kw_output/50'
/*
  stream_api:string = "http://127.0.0.1:5000/kw_output_v2/10"
  daily_api:string = 'http://127.0.0.1:5000/kw_output_v3/7'
  hourly_api:string = 'http://127.0.0.1:5000/kw_output/50'
  // comment here
*/
  constructor( private _http:Http) { 
  }
  // daily data
  getkwv3():Observable<any>{ 
    return this._http.get(this.daily_api)
    .map(res=> res.json())};
  //stream data
   getkwv5():Observable<KwModel[]>{  
     return this._http.get(this.stream_api)
     .map(res => res.json());
    }
   // 30 min data
   getkwv1():Observable<any>{  
     return this._http.get(this.hourly_api)
     .map(res => res.json());
     }

     getkwv2():Observable<any>{ 
        return Observable.concat(Observable.of(null), IntervalObservable.create(5000))
        .flatMap(() => this._http.get(this.stream_api))
        .map(res => res.json());
    }}  
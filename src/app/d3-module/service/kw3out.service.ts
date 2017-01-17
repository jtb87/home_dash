import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { KwModel } from './kw-model'; 

 
@Injectable()
export class KwOutV3Service {

  constructor( private _http:Http) { }
  // daily data
  getkwv3():any{ 
    return this._http.get('http://192.168.1.10:437/kw_output_v3/7')
    .map(res=> res.json())};
  //stream data
   getkwv2():Observable<KwModel[]>{  
     return this._http.get('http://192.168.1.10:437/kw_output_v2/10')
     .map(res => res.json());
    }
   // 30 min data
   getkwv1():any{  
     return this._http.get('http://192.168.1.10:437/kw_output/50')
     .map(res => res.json());
    }
    }
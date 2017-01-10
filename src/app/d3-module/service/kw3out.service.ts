import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class KwOutV3Service {

  constructor( private _http:Http) { }

  getkwv3():any { 
    return this._http.get('http://192.168.1.10:437/kw_output_v3/7')
    .map(res => res.json());}

   getkwv2():any{  
     return this._http.get('http://192.168.1.10:437/kw_output_v2/48')
     .map(res => res.json());
    }
    
   getkwv1():any{  
     return this._http.get('http://192.168.1.10:437/kw_output/50')
     .map(res => res.json());
    }
    }
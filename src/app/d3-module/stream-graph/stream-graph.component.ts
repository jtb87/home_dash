import { Component,ViewChild, ElementRef,  ViewEncapsulation,OnInit } from '@angular/core';
import { KwOutV3Service } from "../service/kw3out.service"
import { KwModel } from '../service/kw-model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-stream-graph',
  templateUrl: './stream-graph.component.html',
  styleUrls: ['./stream-graph.component.css'],
  providers: [KwOutV3Service ], 
  encapsulation: ViewEncapsulation.None
})
export class StreamGraphComponent implements OnInit {
  @ViewChild('hourly') chartcontainer: ElementRef;

  data:Observable<KwModel[]>;
  
  constructor(private _httpService:KwOutV3Service) {
     const $data = this._httpService.getkwv2();
     this.data = $data;
  }

  onclick(){
    console.log(this.data)
  }

  ngOnInit() {
  }

 /*ngOnDestroy(){
   this.data.unsubscribe();
}*/

}

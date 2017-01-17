import { Component,ViewChild, ElementRef,  ViewEncapsulation,OnInit } from '@angular/core';
import { KwOutV3Service } from "../service/kw3out.service"
import { KwModel } from '../service/kw-model';


@Component({
  selector: 'app-stream-graph',
  templateUrl: './stream-graph.component.html',
  styleUrls: ['./stream-graph.component.css'],
  providers: [KwOutV3Service ], 
  encapsulation: ViewEncapsulation.None
})
export class StreamGraphComponent implements OnInit {
  @ViewChild('hourly') chartcontainer: ElementRef;

  data:KwModel[]; 

  constructor(private _httpService:KwOutV3Service) { 
     
     const $data = this._httpService.getkwv2()

     $data.subscribe(data =>  this.data = data) 
      console.log(this.data)
  }

  onclick(){
    console.log(this.data)
     
  }

  ngOnInit() {
  }

}

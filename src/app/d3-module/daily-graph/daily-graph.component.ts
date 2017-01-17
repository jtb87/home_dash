import { Component, OnInit,ElementRef,ViewChild,ViewEncapsulation } from '@angular/core';
import { KwOutV3Service }  from '../service/kw3out.service';
import * as d3 from 'd3'; 

@Component({
  selector: 'app-daily-graph',
  encapsulation: ViewEncapsulation.None,
   templateUrl: './daily-graph.component.html',
  styleUrls: ['./daily-graph.component.css'], 
  providers: [ KwOutV3Service ]
})
export class DailyGraphComponent implements OnInit {
        @ViewChild('daily') chartcontainer: ElementRef;

        private test_d3:any = [];
        test2: any;         
        private dict:any = [];
        private xsort:any = []; 
        private max:any = [];

        private margin = {top: 30, right: 20, bottom: 30, left: 40};
        private width = 800 - this.margin.left - this.margin.right;
        private height = 400 - this.margin.top - this.margin.bottom;
        private svg:any;
        
        private bar:any;
        private x:any; 
        private y:any;
        private x1:any;
        private y2:any;
        private host:any;  

  
  constructor(private _httpService:KwOutV3Service, element:ElementRef ){
  }


  onClickd3(){
    this._httpService.getkwv3()
      .subscribe(
        data => {this.test_d3 = JSON.stringify(data), this.updateDaily()} ,
        error => this.test2 = "No Data" 
      )

       };

  createChart(){
    /*this.htmlElement = this.element.nativeElement;*/
    let elementch = this.chartcontainer.nativeElement;
    this.host = d3.select(elementch)
    

    let xDomain = this.test_d3.map(d => d[0]);
    let yDomain = [0, d3.max(this.test_d3, d => d[1])];


    this.x = d3.scaleBand()
               .rangeRound([0, this.width])
               .padding(0.2)

    this.y = d3.scaleLinear()
               .range([this.height,0]);


    this.svg = this.host
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 800 400")
             //.attr("width",width + margin.left +margin.right )
            //.attr("height",(height + margin.bottom + margin.top))
            .append('g')
            .attr('transform',"translate(" + this.margin.left + "," + this.margin.top + ")");

        this.svg.append('g')
           .attr("transform", "translate(0," + (this.height) + ")")
            .attr('class','Xaxis');

        this.svg.append('g')
            .attr("translate", "transform(0," + this.height + ")")
            .attr('class','Yaxis');
  }

updateDaily() {
        let tick_value = 1;
        let data = JSON.parse(this.test_d3)
        this.y.domain([0, (d3.max(data, d => (d["Usage"])+0.5))])
        this.xsort = data.map(d => d.Date)
        this.x.domain(this.xsort)

//update x axis // select group with class Xaxis // do transitions            
        this.svg.transition().select('g.Xaxis')
            .duration(200)
            .call(d3.axisBottom(this.x)
                    .tickValues(this.x.domain().filter(i => !(i % tick_value))))

// update the y axis 
        this.svg.transition().select("g.Yaxis") 
            .duration(200)
            .attr('class','Yaxis')
            .call(d3.axisLeft(this.y));

//add label to y axis
    this.svg.append("text")
          //.attr("transform", "rotate(-90)")
          .attr("y", 0 - (this.margin.top-5))
          .attr("x", 5 )
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-size","0.8em")
          .text("Usage per day");      
          
//remove old graph data
        this.svg.selectAll('rect').remove()
// Make the changes
        this.bar = this.svg.selectAll('rect').data(data)    

        this.bar.enter().append('rect')
                .attr('class','bar')
                .attr("y", d => this.y(0))
                .attr("height", d => this.height - this.y(0))
                .attr('width',  this.x.bandwidth())
                .attr("x", data => this.x((data.Date)))
                .attr("height", 0)          
                .transition().duration(500)
                    .delay(function (d, i) {return i * 10;})
                  .attr("y", data => this.y((data.Usage)))  
                    .attr("height", d => this.height-this.y((d.Usage)))
      
        };



  ngOnInit() {
    this.make_call()
  }
  
  make_call(){
      console.log("component init done")
      this.createChart()
      this.onClickd3()
  }
ngOnDestroy(){
      console.log("comp destroyed")

       }

  }


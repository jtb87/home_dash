import { Component, OnInit,ElementRef,ViewChild,ViewEncapsulation } from '@angular/core';
import { KwOutV3Service }  from '../service/kw3out.service';
import * as d3 from 'd3'; 


@Component({
  selector: 'app-hourly-graph',
  templateUrl: './hourly-graph.component.html',
  styleUrls: ['./hourly-graph.component.css'], 
  providers: [ KwOutV3Service],
  encapsulation: ViewEncapsulation.None,

})
export class HourlyGraphComponent implements OnInit {
   @ViewChild('hourly') chartcontainer: ElementRef;

  private d3_data:any = [];
  private host:any; 

  private margin = {top: 30, right: 20, bottom: 30, left: 40};
  private width = 800 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;
        
  private x:any;
  private y:any;
  private svg:any;

  private xsort:any;
  private bar:any;

  constructor(private _httpService:KwOutV3Service, element:ElementRef){
  }
  get_data(){
  this._httpService.getkwv1()
      .subscribe(
        data => {this.d3_data = JSON.stringify(data),this.updateHourly()} ,  //this.updateDaily(),
        error => console.log("problem with getting data from API") 
      )};

createChart(){

    let elementch = this.chartcontainer.nativeElement;
    this.host = d3.select(elementch);
    let xDomain = this.d3_data.map(d => d[0]);
    let yDomain = [0, d3.max(this.d3_data, d => d[1])];

    this.x = d3.scaleBand()
               .rangeRound([0, this.width])
               .padding(0.2);

    this.y = d3.scaleLinear()
               .range([this.height,0]);

    this.svg = this.host
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 800 400")
            .append('g')
            .attr('transform',"translate(" + this.margin.left + "," + this.margin.top + ")");

        this.svg.append('g')
           .attr("transform", "translate(0," + (this.height) + ")")
            .attr('class','Xaxis');

        this.svg.append('g')
            .attr("translate", "transform(0," + this.height + ")")
            .attr('class','Yaxis')
            .call(d3.axisLeft(this.y));
  }

updateHourly(){
    let tick_value = 5;
    let data = JSON.parse(this.d3_data)
    //X-axis domain and formatting of time + sort

    let formatTime = d3.timeFormat("%a %H:%M");
    
    //this.x.domain(data.map(d => (d.date))); //formatTime(new Date(d['date']))))
    this.x.domain(data.map(d=> formatTime( new Date(d['date']))))

    this.y.domain([0, (d3.max(data, d => (d["normal_t_usage"] + d["low_t_usage"])))])
    //this.xsort = data.map(d => (formatTime(new Date(d['date']))))
    
     // update the y axis 
    this.svg.transition().select("g.Yaxis") 
        .duration(200)
        .attr('class','Yaxis');

//update x axis // select group with class Xaxis // do transitions                
    this.svg.transition().select('g.Xaxis')
        .duration(100)
        .call(d3.axisBottom(this.x)
                .tickValues(this.x.domain().filter((d,i) => !(i % tick_value))))

//add label to y axis
    this.svg.append("text")
          //.attr("transform", "rotate(-90)")
          .attr("y", 0 - (this.margin.top-5))
          .attr("x", 5 )
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-size","0.8em")
          .text("30 min usage");      

//remove old graph data
        this.svg.selectAll('rect').remove()

// Make the changes
        this.bar = this.svg.selectAll('rect').data(data)    

        this.bar.enter().append('rect')
                .attr('class','bar')
                .attr("y", d => this.y(0))
                .attr("height", d => this.height - this.y(0))
                .attr('width',  this.x.bandwidth())
                .attr("x", data => this.x(formatTime(new Date(data['date']))))
                .attr("height", 0)          
                .transition().duration(500)
                    .delay(function (d, i) {return i * 10;})
                  .attr("y", data => this.y((data["normal_t_usage"] + data["low_t_usage"])))  
                    .attr("height", d => this.height-this.y((d["normal_t_usage"] + d["low_t_usage"])))
  }

  ngOnInit() {
    this.chartInit()
  }

  chartInit(){
    this.createChart()
    this.get_data()
  };
}



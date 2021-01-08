import { Component, OnInit, ViewChild   } from '@angular/core';

import {CoronaDataService} from '../services/corona-data.service'  

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  // Pie
  public pieChartData: number[] = [0,0,0]
  public pieChartLabels: Label[] = [['Dead Cases'], ['Recovered Cases'], 'Active Cases'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(255,255,10, 0.5)', 'rgba(137, 196, 244, 1)'],
    },
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  // Bar
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['20 Dec', '21 Dec','22 Dec','23 Dec','24 Dec','25 Dec','26 Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0,0], label: 'Daily Deaths' },
    { data: [0,0,0,0,0,0,0], label: 'Daily Recovered' },
    { data: [0,0,0,0,0,0,0], label: 'Daily New Cases' }
  ];

  // Line
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Total Death' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Total Recovered' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Total Cases' }
  ]

  public lineChartLabels: Label[] = ['1','','2','4','5','6','7','8','9','10','11'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
    plugins: {
      datalabels: {
          display: false,
      }
    }
  };
  public lineChartColors: Color[] = [
    { // 
      backgroundColor: 'rgba(255, 255, 126, 0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(160,59,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(48,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(137, 196, 244, 0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  // Data
  NewConfirmed:number  
  NewRecovered:number  
  NewDeaths:number  
  TotalConfirmed:number  
  TotalDeaths:number  
  TotalRecovered:number
  ActiveCases: number
  RecoveryRate: String
  MortalityRate: String

  globalDailyData: any

  constructor(private corona: CoronaDataService){}  
  
  ngOnInit(){  
  
    this.getworldtotal() //for worldwide status  

    this.getworld7days() // for global daily data

    this.getworldApril() // data since 13 April
  }   
  
  getworldtotal(){  
    this.corona.getSummary().subscribe((data)=>{  
      // console.log(data) //this is for worldwide status  
        
      this.TotalConfirmed = data.Global.TotalConfirmed
      this.NewConfirmed = data.Global.NewConfirmed
      this.TotalDeaths = data.Global.TotalDeaths
      this.NewDeaths = data.Global.NewDeaths  
      this.TotalRecovered = data.Global.TotalRecovered  
      this.NewRecovered = data.Global.NewRecovered
      this.ActiveCases = this.TotalConfirmed - this.TotalRecovered
      this.RecoveryRate = (data.Global.TotalRecovered / data.Global.TotalConfirmed * 100).toFixed(2)
      this.MortalityRate = (data.Global.TotalDeaths / data.Global.TotalConfirmed * 100).toFixed(2)

      this.pieChartData = [this.TotalDeaths, this.TotalRecovered,  this.ActiveCases];
    })
  }
  
  getDate(num_days: number){
    var date = new Date();
    date.setDate(date.getDate()-num_days);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    // console.log(yyyy+"-"+mm+"-"+dd+"T00:00:00Z");

    return yyyy+"-"+mm+"-"+dd+"T00:00:00Z"
  }

  getworld7days(){
    // bar chart labels
    var dateLabel:any[] = new Array()
    for (let i=0; i<8; i++){
      var date = new Date();
      date.setDate(date.getDate()-i-1)
      dateLabel[this.barChartLabels.length-1-i] = String(date.getDate()).padStart(2, '0')+"/" + String(date.getMonth()+1).padStart(2, '0')
    }
    this.barChartLabels = dateLabel
    
    // bar chart data
    this.corona.getWorldbyDate(this.getDate(12), this.getDate(0)).subscribe((data)=>{
      console.log(data)
      data.sort(function(a,b){
        return a.TotalConfirmed - b.TotalConfirmed
      })

      var dailyData:any[][] = new Array()
      for (let i=0; i<3; i++){
        dailyData[i] = []
      }
      for (let i=0; i<7; i++){
        dailyData[0].push(data[i].NewDeaths)
        dailyData[1].push(data[i].NewRecovered)
        dailyData[2].push(data[i].NewConfirmed)
      }
      
      this.barChartData[0].data = dailyData[0]
      this.barChartData[1].data = dailyData[1]
      this.barChartData[2].data = dailyData[2]
    })
  }

  getworldApril(){
    // line chart labels
    var line_dateLabel:any[] = new Array()
    var date = new Date();
    var aprilDate = new Date('2020-04-14');

    while(date.getTime() >= aprilDate.getTime()){
      date.setDate(date.getDate()-1)
      line_dateLabel.push(String(date.getDate())+"/" + String(date.getMonth() + 1).padStart(2, '0'))
    }

    line_dateLabel = line_dateLabel.reverse()
    this.lineChartLabels = line_dateLabel

    // line chart data
    this.corona.getWorldbyDate("2020-04-13T00:00:00Z", this.getDate(0)).subscribe((data)=>{
      // console.log(data)
      data.sort(function(a, b){
        return a.TotalConfirmed - b.TotalConfirmed
      })

      var dailyData:any[][] = new Array()
      for (let i=0; i<3; i++){
        dailyData[i] = []
      }

      for (let i=0; i<data.length; i++){
        dailyData[0].push(data[i].TotalDeaths)
        dailyData[1].push(data[i].TotalRecovered)
        dailyData[2].push(data[i].TotalConfirmed)
      }
      
      this.lineChartData[0].data = dailyData[0]
      this.lineChartData[1].data = dailyData[1]
      this.lineChartData[2].data = dailyData[2]
    })

    console.log(this.lineChartData)
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }
  
}

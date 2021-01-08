import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {CoronaDataService} from '../services/corona-data.service'  

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { AuthNewsService } from '../services/auth-news.service';
import { User } from '../user.model';
import { News } from '../news.model';
import { collectExternalReferences } from '@angular/compiler';

interface DailyData{
  dailyDeaths: number;
  dailyRecovered: number;
  dailyCases: number;
}

class DailyData{
  dailyDeaths: number;
  dailyRecovered: number;
  dailyCases: number;

  constructor(dailyDeaths: number, dailyRecovered: number, dailyCases: number){
    this.dailyDeaths = dailyDeaths;
    this.dailyRecovered = dailyRecovered;
    this.dailyCases = dailyCases;
  }
}


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})

export class CountryPageComponent implements OnInit {
  news_flag = 0

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
        display: false
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
        display: false
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

    Line
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
  countries:any
  countryDetails: any

  NewConfirmed:number  
  NewRecovered:number  
  NewDeaths:number  
  TotalConfirmed:number  
  TotalDeaths:number  
  TotalRecovered:number
  ActiveCases: number
  RecoveryRate: String
  MortalityRate: String

  user: User;
  userName: string;
  news: News[] = [];
  date: Date;
  description: string;
  country: string;

  count: number = 2;

  public countrySlug: string;



  constructor(private activatedRoute: ActivatedRoute, private corona: CoronaDataService,
    public authNews: AuthNewsService) { }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.countrySlug = this.activatedRoute.snapshot.paramMap.get('countrySlug');
    console.log(this.countrySlug);

    // get covid-19 data
    this.getCountryTotal(this.countrySlug)

    this.getCountry7days()

    this.getCountryDayOne()

    console.log("YO")
    this.getNewsandUser()
  }

  // functions
  getCountryTotal(slug: string){  
    this.corona.getSummary().subscribe((data)=>{  
      // step1: find the Countries[i] which has the right Country name
      for (var CountriyData of data.Countries){
        if (CountriyData.Slug == slug){
          console.log("Found the country name!")
          this.countryDetails = CountriyData
          this.country = CountriyData.Country
        }
      }

      console.log(this.countryDetails) //this is for worldwide status  
      // step2: dataCountry.TotalConfirmed ....
      this.TotalConfirmed = this.countryDetails.TotalConfirmed
      this.NewConfirmed = this.countryDetails.NewConfirmed
      this.TotalDeaths = this.countryDetails.TotalDeaths
      this.NewDeaths = this.countryDetails.NewDeaths  
      this.TotalRecovered = this.countryDetails.TotalRecovered  
      this.NewRecovered = this.countryDetails.NewRecovered
      this.ActiveCases = this.TotalConfirmed - this.TotalRecovered
      this.RecoveryRate = (this.countryDetails.TotalRecovered / this.countryDetails.TotalConfirmed * 100).toFixed(2)
      this.MortalityRate = (this.countryDetails.TotalDeaths / this.countryDetails.TotalConfirmed * 100).toFixed(2)

      this.pieChartData = [this.TotalDeaths, this.TotalRecovered,  this.ActiveCases];
    })
  }

  getDate(num_days: number){
    var date = new Date();
    date.setDate(date.getDate()-num_days);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy+"-"+mm+"-"+dd+"T00:00:00Z"
  }

  getCountry7days(){
    // bar chart labels
    var dateLabel:any[] = new Array()
    
    for (let i=0; i<7; i++){
      var date = new Date();
      date.setDate(date.getDate()-1-i)
      dateLabel[i] = String(date.getDate()).padStart(2, '0')+"/" + String(date.getMonth()+1).padStart(2, '0')
    }
    this.barChartLabels = dateLabel.reverse()
    
    // bar chart data
    this.corona.getCountryAllStatusbyDate(this.countrySlug, this.getDate(8), this.getDate(0)).subscribe((data)=>{
      // Sort the data accoording to TotalConfirmed (Ascending order)
      data.sort(function(a,b){
        return a.Confirmed - b.Confirmed
      })

      let list: Array<any> = []
  
      // console.log(data)
      //Todo: group data by date, throw away province
      var merged_province_OneDay_Confirmed: {[data_date: string]: number} = {}
      var merged_province_OneDay_Recovered: {[data_date: string]: number} = {}
      var merged_province_OneDay_Deaths: {[data_date: string]: number} = {}
      var merged_province_EightDay = []
      for (var elem of data){
        if (merged_province_OneDay_Confirmed[elem.Date] == undefined){
          merged_province_OneDay_Confirmed[elem.Date] = elem.Confirmed
        }
        else{
          merged_province_OneDay_Confirmed[elem.Date] += elem.Confirmed
        }
        if (merged_province_OneDay_Recovered[elem.Date] == undefined){
          merged_province_OneDay_Recovered[elem.Date] = elem.Recovered
        }
        else{
          merged_province_OneDay_Recovered[elem.Date] += elem.Recovered
        }
        if (merged_province_OneDay_Deaths[elem.Date] == undefined){
          merged_province_OneDay_Deaths[elem.Date] = elem.Deaths
        }
        else{
          merged_province_OneDay_Deaths[elem.Date] += elem.Deaths
        }
      }
      // merged_province_EightDay.push(merged_province_OneDay_Confirmed)
      // merged_province_EightDay.push(merged_province_OneDay_Recovered)
      // merged_province_EightDay.push(merged_province_OneDay_Deaths)

      // merged_province_EightDay.push(Object.values(merged_province_OneDay_Confirmed))
      merged_province_EightDay.push(Object.values(merged_province_OneDay_Deaths).sort())
      merged_province_EightDay.push(Object.values(merged_province_OneDay_Recovered).sort())
      merged_province_EightDay.push(Object.values(merged_province_OneDay_Confirmed).sort(function(a,b){
        return a - b
      }))
    
      console.log(merged_province_EightDay)
      for (let i=1; i<8; i++){
        list[i-1] = []
        // console.log(i)
        list[i-1][0] = merged_province_EightDay[0][i] - merged_province_EightDay[0][i-1]
        list[i-1][1] = merged_province_EightDay[1][i] - merged_province_EightDay[1][i-1]
        list[i-1][2] = merged_province_EightDay[2][i] - merged_province_EightDay[2][i-1]       
        // list[i-1][1] = data[i].Recovered - data[i-1].Recovered
        // list[i-1][2] = data[i].Confirmed - data[i-1].Confirmed
      }

      console.log(list)
      // Store the data into BarChart Graph
      var dailyData:any[][] = new Array()
      for (let i=0; i<3; i++){
        dailyData[i] = []
      }
      for (let i=0; i<7; i++){
        dailyData[0].push(list[i][0])
        dailyData[1].push(list[i][1])
        dailyData[2].push(list[i][2])
      }
      
      this.barChartData[0].data = dailyData[0]
      this.barChartData[1].data = dailyData[1]
      this.barChartData[2].data = dailyData[2]
    })
  }

  getCountryDayOne(){
    // line chart data
    this.corona.getCountryDayOne(this.countrySlug).subscribe((data)=>{
      // console.log("getCountryDayOne")
      // console.log(data)

      data.sort(function(a, b){
        return a.TotalConfirmed - b.TotalConfirmed
      })

      var dailyDataDayOne:any[][] = new Array()
      for (let i=0; i<3; i++){
        dailyDataDayOne[i] = []
      }

      for (let i=0; i<data.length; i++){
        // line chart labels
        this.lineChartLabels.push(data[i].Date)

        // line chart data
        dailyDataDayOne[0].push(data[i].Deaths)
        dailyDataDayOne[1].push(data[i].Recovered)
        dailyDataDayOne[2].push(data[i].Confirmed)
      }
      
      this.lineChartData[0].data = dailyDataDayOne[0]
      this.lineChartData[1].data = dailyDataDayOne[1]
      this.lineChartData[2].data = dailyDataDayOne[2]
    })
  }

  // news and user
  getNewsandUser(){
    this.user = this.authNews.getUser();
    this.userName = this.user.displayName;
    this.authNews.getAllNews().subscribe((news: News[])=>{
      // if(this.count == 2){
      //   // Go through the news, select the ones with the correct country name
      //   for(let i=0; i<news.length; i++){
      //     if(news[i].country == this.country){
      //       this.news.push(news[i]);
      //     }
      //   }
      // }
      // else if(this.count == 0){
      //   this.count = 2;
      // }
      // else{
      //   this.count -= 1;
      // }
      
      console.log(this.news_flag)
      if (this.news_flag == 0){
        console.log("printing news")
        for(let i=0; i<news.length; i++){
          if(news[i].country == this.country){
            this.news.push(news[i]);
          }
        }
      }
      this.news_flag = 1
    });
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }
}

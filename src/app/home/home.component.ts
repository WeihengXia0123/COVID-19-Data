import { Component, OnInit } from '@angular/core';
import {CoronaDataService} from '../services/corona-data.service'  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  countries:any  
  country:any  
  Date:Date  
  Active:number  
  Country:String  

  NewConfirmed:number  
  NewRecovered:number  
  NewDeaths:number  
  TotalConfirmed:number  
  TotalDeaths:number  
  TotalRecovered:number
  ActiveCases: number
  RecoveryRate: String
  MortalityRate: String
  
  constructor(private corona: CoronaDataService){}  
  
  ngOnInit(){  
    this.corona.getCountries().subscribe((data)=>{  
    console.log(data)  
    this.countries = data  
    }) //for populating country names in dropdown  
  
    this.getworldtotal() //for worldwide status  
  }  
  
  getworldtotal(){  
    this.corona.getSummary().subscribe((data)=>{  
      console.log(data) //this is for worldwide status  
        
      this.TotalConfirmed = data.Global.TotalConfirmed
      this.NewConfirmed = data.Global.NewConfirmed
      this.TotalDeaths = data.Global.TotalDeaths
      this.NewDeaths = data.Global.NewDeaths  
      this.TotalRecovered = data.Global.TotalRecovered  
      this.NewRecovered = data.Global.NewRecovered
      this.ActiveCases = this.TotalConfirmed - this.TotalRecovered
      this.RecoveryRate = (data.Global.TotalRecovered / data.Global.TotalConfirmed * 100).toFixed(2)
      this.MortalityRate = (data.Global.TotalDeaths / data.Global.TotalConfirmed * 100).toFixed(2)
    })

  }
}

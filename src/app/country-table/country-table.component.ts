import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {CoronaDataService} from '../services/corona-data.service'  

interface Country {
  name: string;
  slug: string;
  newCases: number;
  totalCases: number;
  newRecoveries: number;
  totalRecoveries: number;
  newDeaths: number;
  totalDeaths: number;
}

const COUNTRIES: Country[] = [];

export type SortColumn = keyof Country | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}


@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})

export class CountryTableComponent implements OnInit{
  // fontawesome
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;


  // hover
  hover1 = false
  hover2 = false
  hover3 = false
  hover4 = false
  hover5 = false
  hover6 = false
  hover7 = false

  sortFlag = [0,0,0,0,0,0,0]

  // table
  countries = COUNTRIES;

  constructor(private corona: CoronaDataService){ }

  ngOnInit(){
    this.getbyCountry()

    
  }

  getbyCountry(){
    this.corona.getFirestoreCountrySummary().subscribe((data: any)=>{
      // console.log(data)
      
      for (let i=0; i<data.length; i++){
        COUNTRIES.push({
          name: data[i].Country,
          slug: data[i].Slug,
          newCases: data[i].NewConfirmed,
          totalCases: data[i].TotalConfirmed,
          newRecoveries: data[i].NewRecovered,
          totalRecoveries: data[i].TotalRecovered,
          newDeaths: data[i].NewDeaths,
          totalDeaths: data[i].TotalDeaths
          })
      }

    })


    // this.corona.getSummary().subscribe((data)=>{
    //   // console.log(data)
      
    //   for (let i=0; i<data.Countries.length; i++){
    //     // this.newCountry.slug = data.Countries[i].Slug
    //     COUNTRIES.push({
    //       name: data.Countries[i].Country,
    //       slug: data.Countries[i].Slug,
    //       newCases: data.Countries[i].NewConfirmed,
    //       totalCases: data.Countries[i].TotalConfirmed,
    //       newRecoveries: data.Countries[i].NewRecovered,
    //       totalRecoveries: data.Countries[i].TotalRecovered,
    //       newDeaths: data.Countries[i].NewDeaths,
    //       totalDeaths: data.Countries[i].TotalDeaths
    //       })
    //   }
      
    //   // this.sortbyCountrynewCases()
    // })
  }

  public sortbyCountryName(){
    console.log("sorting")
    if(this.sortFlag[0] == 0){
      COUNTRIES.sort(function(a, b){
        return b.name.localeCompare(a.name);
      })
      this.sortFlag[0] = 1
    }
    else{
      COUNTRIES.sort(function(a, b){
        return a.name.localeCompare(b.name);
      })
      this.sortFlag[0] = 0
    }
  };

  public sortbyCountrynewCases(){
    console.log("sorting")

    if(this.sortFlag[1] == 0){
      COUNTRIES.sort(function(a, b){
        return b.newCases - a.newCases;
      })
      this.sortFlag[1] = 1
    }
    else{
      COUNTRIES.sort(function(a, b){
        return a.newCases - b.newCases;
      })
      this.sortFlag[1] = 0
    }
  };

  public sortbyCountrytotalCases(){
    console.log("sorting")

    if(this.sortFlag[2] == 0){
      COUNTRIES.sort(function(a, b){
        return b.totalCases - a.totalCases;
      })
      this.sortFlag[2] = 1
    }
    else{
      COUNTRIES.sort(function(a, b){
        return a.totalCases - b.totalCases;
      })
      this.sortFlag[2] = 0
    }
  };

  public sortbyCountrynewRecoveries(){
    console.log("sorting")

    if(this.sortFlag[3] == 0){
      COUNTRIES.sort(function(a, b){
        return b.newRecoveries - a.newRecoveries;
      })
      this.sortFlag[3] = 1
    }
    else{
      COUNTRIES.sort(function(a, b){
        return a.newRecoveries - b.newRecoveries;
      })
      this.sortFlag[3] = 0
    }
  };

  public sortbyCountrytotalRecoveries(){
    console.log("sorting")

    if(this.sortFlag[4] == 0){
      COUNTRIES.sort(function(a, b){
        return b.totalRecoveries - a.totalRecoveries;
      })
      this.sortFlag[4] = 1
    }
    else{
      COUNTRIES.sort(function(a, b){
        return a.totalRecoveries - b.totalRecoveries;
      })
      this.sortFlag[4] = 0
    }
  };

  public sortbyCountrynewDeaths(){
    console.log("sorting")

    if(this.sortFlag[5] == 0){
      COUNTRIES.sort(function(a, b){
        return b.newDeaths - a.newDeaths;
      })
      this.sortFlag[5] = 1
    }
    else{
      COUNTRIES.sort(function(a, b){
        return a.newDeaths - b.newDeaths;
      })
      this.sortFlag[5] = 0
    }
  };

  public sortbyCountrytotalDeaths(){
    console.log("sorting")

    if(this.sortFlag[6] == 0){
      COUNTRIES.sort(function(a, b){
        return b.totalDeaths - a.totalDeaths;
      })
      this.sortFlag[6] = 1
    }
    else{
      COUNTRIES.sort(function(a, b){
        return a.totalDeaths - b.totalDeaths;
      })
      this.sortFlag[6] = 0
    }
  };
}
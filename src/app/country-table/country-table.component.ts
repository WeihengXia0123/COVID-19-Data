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

  // table
  countries = COUNTRIES;

  constructor(private corona: CoronaDataService){ }

  ngOnInit(){
    this.getbyCountry()

    
  }

  getbyCountry(){
    this.corona.getSummary().subscribe((data)=>{
      console.log(data)
      
      for (let i=0; i<data.Countries.length; i++){
        // this.newCountry.slug = data.Countries[i].Slug
        COUNTRIES.push({
          name: data.Countries[i].Country,
          slug: data.Countries[i].Slug,
          newCases: data.Countries[i].NewConfirmed,
          totalCases: data.Countries[i].TotalConfirmed,
          newRecoveries: data.Countries[i].NewRecovered,
          totalRecoveries: data.Countries[i].TotalRecovered,
          newDeaths: data.Countries[i].NewDeaths,
          totalDeaths: data.Countries[i].TotalDeaths
          })
      }
      
      // this.sortbyCountrynewCases()
    })
  }

  public sortbyCountrynewCasesUp(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return a.newCases - b.newCases;
    })
  };
  public sortbyCountrynewCasesDown(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return b.newCases - a.newCases;
    })
  };

  public sortbyCountryNameUp(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return a.name.localeCompare(b.name);
    })
  };
  public sortbyCountryNameDown(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return b.name.localeCompare(a.name);
    })
  };

  public sortTotalCasesUp(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return a.totalCases - b.totalCases;
    })
  };
  public sortTotalCasesDown(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return b.totalCases - a.totalCases;
    })
  };

  public sortNewRecvUp(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return a.newRecoveries - b.newRecoveries;
    })
  };
  public sortNewRecvDown(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return b.newRecoveries - a.newRecoveries;
    })
  };

  public sortTotalRecvUp(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return a.totalRecoveries - b.totalRecoveries;
    })
  };
  public sortTotalRecvDown(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return b.totalRecoveries - a.totalRecoveries;
    })
  };

  public sortNewDeathUp(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return a.newDeaths - b.newDeaths;
    })
  };
  public sortNewDeathDown(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return b.newDeaths - a.newDeaths;
    })
  };

  public sortTotalDeathUp(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return a.totalDeaths - b.totalDeaths;
    })
  };
  public sortTotalDeathDown(){
    console.log("sorting")
    COUNTRIES.sort(function(a, b){
      return b.totalDeaths - a.totalDeaths;
    })
  };

}
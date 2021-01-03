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
      
    })
  }

}
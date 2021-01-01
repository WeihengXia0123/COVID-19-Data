import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {CoronaDataService} from '../services/corona-data.service'  

interface Country {
  name: string;
  newCases: number;
  totalCases: number;
  newRecoveries: number;
  totalRecoveries: number;
  newDeaths: number;
  totalDeaths: number;

}

const COUNTRIES: Country[] = [
  {
    name: 'China',
    newCases: 1,
    totalCases: 1,
    newRecoveries: 1,
    totalRecoveries: 1,
    newDeaths: 1,
    totalDeaths: 1
  }
];

export type SortColumn = keyof Country | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
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

  // covid-19 API data
  newCountry: Country

  // table
  countries = COUNTRIES;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private corona: CoronaDataService){ }

  ngOnInit(){
    this.getbyCountry()
  }

  getbyCountry(){
    this.corona.getCountries().subscribe((data)=>{
      console.log(data)
      
      for (let i=0; i<data.length; i++){
        // this.newCountry.name = ...
        COUNTRIES.push(this.newCountry)
      }
      
    })
  }

  onSort({column, direction}: SortEvent) {
    console.log("sorting")
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.countries = COUNTRIES;
    } else {
      this.countries = [...COUNTRIES].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
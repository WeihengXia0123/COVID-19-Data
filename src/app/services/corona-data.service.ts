import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CoronaDataService {

  constructor(private http:HttpClient) { }

  getCountries():Observable<any>{  
    const url = "https://api.covid19api.com/countries"  
    return this.http.get<any>(url)  
  }

  getCountryAllStatusbyDate(slug, from_date, to_date):Observable<any>{
    const url = "https://api.covid19api.com/country/" + slug + "?from=" + from_date + "&to=" + to_date
    console.log(url)
    return this.http.get<any>(url) 
  }

  getCountryDayOne(slug):Observable<any>{
    const url = "https://api.covid19api.com/total/dayone/country/" + slug
    return this.http.get<any>(url) 
  }

  getSummary():Observable<any>{  
    const url = "https://api.covid19api.com/summary"  
    return this.http.get<any>(url)  
  }

  getWorldbyDate(from_date, to_date):Observable<any>{
    const url = "https://api.covid19api.com/world?from=" + from_date + "&to=" + to_date
    console.log(url)
    return this.http.get<any>(url)  
  } 

}

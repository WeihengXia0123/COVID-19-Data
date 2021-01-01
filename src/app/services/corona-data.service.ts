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
  } //This method is for populate country list in dropdown. Mention your api url in   
  //place of xxxx.com   

  getSummary():Observable<any>{  
    const url = "https://api.covid19api.com/summary"  
    return this.http.get<any>(url)  
  } //this method is for worldwide covid-19 status.  Mention your api url   
  // in place of xxxx.com  

  getWorldbyDate(from_date, to_date):Observable<any>{
    const url = "https://api.covid19api.com/world?from=" + from_date + "&to=" + to_date
    console.log(url)
    return this.http.get<any>(url)  
  } 

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {Observable} from 'rxjs'; 
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoronaDataService {
  constructor(private http:HttpClient, private firesotre: AngularFirestore) { }

  public async updateFireStoreSummaryData(){
    // Check if data is up-to-date
    const firestore_date = this.firesotre.collection('summary').doc("Date").valueChanges();
    let flag = 0
    firestore_date.subscribe((data:any)=>{
      if(flag == 0){
        flag = 1;
        if(data === undefined){
          this.updateFireStoreSummary();
        }
        else{
          let data_date = new Date(data.date);
          let curr_date = new Date();
          if(data_date.getFullYear() < curr_date.getFullYear()){
            this.updateFireStoreSummary();
          }
          else if(data_date.getMonth() < curr_date.getMonth()){
            this.updateFireStoreSummary();
          }
          else if(data_date.getDate() < curr_date.getDate()){
            this.updateFireStoreSummary();
          }
          else{
            console.log("Firestore summary data is already up-to-date.")
            return false;
          }
        }
      }

    })

  }

  updateFireStoreSummary(){
    // Update data in the database if not up-to-date
    this.getSummary().subscribe((data)=>{
      console.log(data)
      this.firesotre.collection("summary").doc('Date').set({
        date: data.Date
      }, {merge: true})
      this.firesotre.collection("Global").doc('Global').set({
        TotalConfirmed: data.Global.TotalConfirmed,
        NewConfirmed: data.Global.NewConfirmed,
        TotalDeaths: data.Global.TotalDeaths,
        NewDeaths: data.Global.NewDeaths,
        TotalRecovered: data.Global.TotalRecovered,
        NewRecovered: data.Global.NewRecovered
      }, {merge: true})
      for(var elem of data.Countries){
        this.firesotre.collection("summary").doc(elem.Country).set({
          Country: elem.Country,
          Slug: elem.Slug,
          TotalConfirmed: elem.TotalConfirmed,
          NewConfirmed: elem.NewConfirmed,
          TotalDeaths: elem.TotalDeaths,
          NewDeaths: elem.NewDeaths,
          TotalRecovered: elem.TotalRecovered,
          NewRecovered: elem.NewRecovered
        }, {merge: true});
      };
    })
  }


  public getFirestoreGlobalSummary(){
    return this.firesotre.collection('Global').doc('Global').valueChanges();
    // return this.firesotre.collection('users').doc(this.user.uid).collection('news').valueChanges();
  }

  public getFirestoreCountrySummary(){
    return this.firesotre.collection('summary').valueChanges();
    // return this.firesotre.collection('users').doc(this.user.uid).collection('news').valueChanges();
  }

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

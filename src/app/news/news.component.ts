import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';
import { AuthNewsService } from '../services/auth-news.service';
import { CoronaDataService } from '../services/corona-data.service';
import { User } from '../user.model';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  user: User;
  userName: string;
  news: News[];
  date: Date;
  description: string;
  country: string;
  countryList: any[] = [];

  constructor(private authNews: AuthNewsService, private corona: CoronaDataService) { }

  ngOnInit(): void {
    this.user = this.authNews.getUser();
    this.userName = this.user.displayName;
    this.date = new Date()

    this.getCountryList()
  }

  addNews(){
    let news:News = {
      userName: this.userName,
      date: new Date(this.date),
      description: this.description,
      country: this.country
    };
    this.authNews.addNews(news);

    this.date = undefined;
    this.description = undefined;
    this.country = undefined;
  }

  getCountryList(){  
    console.log("getCountryList")

    this.corona.getSummary().subscribe((data)=>{  
      // console.log(data) //this is for worldwide status  
      this.countryList.push(Array(["Global"]))
      for (let i=0; i<data.Countries.length; i++){
        // this.countryList[i] = []
        this.countryList.push(Array(data.Countries[i].Country, data.Countries[i].Slug))
      }
      
      // console.log(this.countryList)
    })
  }
}

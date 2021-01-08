import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';
import { AuthNewsService } from '../services/auth-news.service';
import { User } from '../user.model';

@Component({
  selector: 'app-news-board',
  templateUrl: './news-board.component.html',
  styleUrls: ['./news-board.component.css']
})
export class NewsBoardComponent implements OnInit {
  news: News[] = [];
  count: number = 2;
  news_flag = 0

  constructor(public authNews: AuthNewsService) { }

  ngOnInit(): void {
    
  this.authNews.getAllNews().subscribe((news: News[])=>{
    // One wierd pheonomenon here:
    // my subscribe() will fire 3 times!
    // but I didn't change the data on News!
    if(this.news_flag == 0){
      for(let i=0; i<news.length; i++){
        if(news[i].country == "Global"){
          this.news.push(news[i]);
        }
      }
      this.news_flag = 1
    }

  });

  }

}

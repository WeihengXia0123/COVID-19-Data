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

  constructor(public authNews: AuthNewsService) { }

  ngOnInit(): void {
    
  this.authNews.getAllNews().subscribe((news: News[])=>{
    // One wierd pheonomenon here:
    // my subscribe() will fire 3 times!
    // but I didn't change the data on News!
    if(this.count == 2){
      this.news = news;
      console.log(this.news)
    }
    else if(this.count == 0){
      this.count = 2
    }
    else{
      this.count -= 1;
    }
  });

  }

}

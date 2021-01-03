import { Component, OnInit } from '@angular/core';
import {AuthNewsService} from './services/auth-news.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{ //list of arrays to access dynamic data from API and these array names should match with API end points with value names
  constructor(public authNewsService: AuthNewsService){}

  ngOnInit(){

  }
}  

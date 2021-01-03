import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AngularFireModule} from "@angular/fire"
import { AngularFirestoreModule} from "@angular/fire/firestore"
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule} from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { CountryPageComponent } from './country-page/country-page.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewsComponent } from './news/news.component';
import { NewsBoardComponent } from './news-board/news-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    CountryPageComponent,
    CountryTableComponent,
    NewsComponent,
    NewsBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ChartsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

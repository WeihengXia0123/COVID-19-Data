import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    CountryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

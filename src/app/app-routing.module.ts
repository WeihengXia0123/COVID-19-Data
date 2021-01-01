import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryPageComponent } from './country-page/country-page.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: "homePage", component: HomeComponent},
  { path: "countryPage", component: CountryPageComponent},
  { path: "signin", component: SigninComponent},
  { path: "countryTable", component: CountryTableComponent},
  { path: "", pathMatch: "full", redirectTo: "homePage"},
  { path:"**", redirectTo:"homePage"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

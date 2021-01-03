import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSignedInGuard } from './auth-signed-in.guard';
import { AuthGuard } from './auth.guard';
import { CountryPageComponent } from './country-page/country-page.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: "homePage", component: HomeComponent},
  { path: "signin", component: SigninComponent, canActivate: [AuthSignedInGuard]},
  { path: "countryTable", component: CountryTableComponent},
  { path: "countries/:countrySlug", component: CountryPageComponent},
  { path: "news", component: NewsComponent, canActivate: [AuthGuard]},
  { path: "", pathMatch: "full", redirectTo: "homePage"},
  { path:"**", redirectTo:"homePage"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

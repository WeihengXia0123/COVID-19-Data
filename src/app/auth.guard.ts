import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthNewsService } from './services/auth-news.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authNewsService: AuthNewsService, private router: Router){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // if(this.authNewsService.userSignedIn()){
    //   if(!this.authNewsService.userEligible()){
    //     alert("This user is NOT ELIGIBLE to add news!")
    //     this.router.navigate(['homePage'])
    //   }
    // }
    if(!this.authNewsService.userSignedIn()){
      this.router.navigate(["signin"])
    }

    return true;
  }
  
}

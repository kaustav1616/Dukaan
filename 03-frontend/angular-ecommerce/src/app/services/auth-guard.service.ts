import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService 
{
    constructor
    (
        private router: Router,
        private authService: AuthServiceService
    ) 
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    {
        if(this.authService.isLoggedIn())
            return true;

        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl("login");
        return false;
    }
}
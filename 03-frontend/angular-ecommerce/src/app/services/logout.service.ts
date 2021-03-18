import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/* This service is meant to communicate to logout component from other components 
 * when it should be activated and when it should be deactivated.
*/
export class LogoutService 
{
    private logoutStatus: boolean;

    constructor() 
    { 
        this.logoutStatus = true;
    }

    activate()
    {
        this.logoutStatus = true;
    }

    deactivate()
    {
        this.logoutStatus = false;
    }

    isActive(): boolean
    {
        return this.logoutStatus;
    }
}
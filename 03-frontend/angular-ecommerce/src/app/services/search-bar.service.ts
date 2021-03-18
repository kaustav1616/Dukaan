import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService 
{
    private searchBarStatus: boolean;

    constructor() 
    { 
        this.searchBarStatus = false;
    }

    activate()
    {
        this.searchBarStatus = true;
    }

    deactivate()
    {
        this.searchBarStatus = false;
    }

    isActive(): boolean
    {
        return this.searchBarStatus;
    }
}

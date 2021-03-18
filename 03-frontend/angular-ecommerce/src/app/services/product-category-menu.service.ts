import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryMenuService 
{
    private categoryMenuStatus: boolean;

    constructor() 
    { 
        this.categoryMenuStatus = false;
    }

    activate()
    {
        this.categoryMenuStatus = true;
    }

    deactivate()
    {
        this.categoryMenuStatus = false;
    }

    isActive(): boolean
    {
        return this.categoryMenuStatus;
    }
}

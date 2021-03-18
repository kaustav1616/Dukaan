import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartStatusService 
{
    private cartStatus: boolean;

    constructor() 
    {
        this.cartStatus = false;
    }

    activate()
    {
        this.cartStatus = true;
    }

    deactivate()
    {
        this.cartStatus = false;
    }

    isActive(): boolean
    {
        return this.cartStatus;
    }
}

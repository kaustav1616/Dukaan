import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { stringify } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogoutService } from 'src/app/services/logout.service';
import { ProductCategoryMenuService } from 'src/app/services/product-category-menu.service';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { CartStatusService } from 'src/app/services/cart-status.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit 
{
    userName: string;
    password: string;
    errorMessage: string;

    constructor(private authService: AuthServiceService, 
        private router: Router, private logoutService: LogoutService, private productCategoryMenuService: ProductCategoryMenuService,
        private seachBarService: SearchBarService, private cartStatusService: CartStatusService)
    {
        this.userName = "";
        this.password = "";
        this.errorMessage = "";
    }

    ngOnInit(): void 
    {   
        this.logoutService.deactivate(); // communicates through LogoutService to LogoutComponent, asking it to disable itself
        this.productCategoryMenuService.deactivate();
        this.seachBarService.deactivate();
        this.cartStatusService.deactivate();

        let message = this.authService.getLoginErrorMessage();

        if(message) // set by angular interceptor due to token expiry (has been redirected from there)
        {
            this.errorMessage = message;
            this.authService.setLoginErrorMessage("");
        }
    }

    onSubmit()
    {
        if(this.authService.isLoggedIn())
        {
            this.router.navigateByUrl("products");
            return;
        }

        this.authService.login(this.userName, this.password).subscribe
        (
            data =>
            {
                this.errorMessage = "";
                console.log(data.jwt);
                // localStorage.setItem("id_token", data.jwt);
                this.router.navigateByUrl("products");
            },
            error =>
            {
                this.errorMessage = "Invalid Credentials. Try again!!";
                console.log(error);
            }
        );
    }
}
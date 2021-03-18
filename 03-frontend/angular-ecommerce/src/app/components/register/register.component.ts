import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CartStatusService } from 'src/app/services/cart-status.service';
import { LogoutService } from 'src/app/services/logout.service';
import { ProductCategoryMenuService } from 'src/app/services/product-category-menu.service';
import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    userName: string;
    password1: string;
    password2: string;
    errorMessage: string;

    constructor(private authService: AuthServiceService, private router: Router, private logoutService: LogoutService,
        private productCategoryMenuService: ProductCategoryMenuService,
        private seachBarService: SearchBarService, private cartStatusService: CartStatusService) 
    { 
        this.userName = "";
        this.password1 = "";
        this.password2 = "";
        this.errorMessage = "";
    }

  ngOnInit(): void 
  {
    this.logoutService.deactivate(); // communicates through LogoutService to LogoutComponent, asking it to disable itself
    this.productCategoryMenuService.deactivate();
    this.seachBarService.deactivate();
    this.cartStatusService.deactivate();
  }

  onSubmit()
  {
    if(!this.validate())
        return;

    this.authService.register(this.userName, this.password1).subscribe
    (
        data => 
        {
            console.log(data);
            this.router.navigateByUrl("login");
        },
        error =>
        {
            console.log(error);
        }
    );
  }

  validate(): boolean
  {
    if(this.userName == "")
        this.errorMessage = "User name can't be empty!!";
    else if(this.password1 == "")
        this.errorMessage = "Password can't be empty";
    else if(this.password1 != this.password2)
        this.errorMessage = "Passwords don't match";

    return (this.errorMessage == "");
  }
}
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { LogoutService } from 'src/app/services/logout.service';
import { ProductCategoryMenuService } from 'src/app/services/product-category-menu.service';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { CartStatusService } from 'src/app/services/cart-status.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit 
{
  product: Product = new Product();

  constructor(private productService: ProductService, private theCartService: CartService, private route: ActivatedRoute
    , private logoutService: LogoutService, 
    private productCategoryMenuService: ProductCategoryMenuService, private seachBarService: SearchBarService, 
    private cartStatusService: CartStatusService) { }

  ngOnInit(): void {
    this.logoutService.activate(); // communicates through LogoutService to LogoutComponent, asking it to disable itself
    this.productCategoryMenuService.activate();
    this.seachBarService.activate();
    this.cartStatusService.activate();
    
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  
  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addtoCart()
  {
    this.theCartService.addToCart(this.product.id);
  }
}
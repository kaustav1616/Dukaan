import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CartProduct } from 'src/app/common/cart-product';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
<<<<<<< HEAD
import { LogoutService } from 'src/app/services/logout.service';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { ProductCategoryMenuService } from 'src/app/services/product-category-menu.service';
import { CartStatusService } from 'src/app/services/cart-status.service';
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
<<<<<<< HEAD

export class CartDetailsComponent implements OnInit 
{
  thePageNumber: number = 1; // initialized with 1 because when component is loaded for first time, it displays page 1 of category 1
  thePageSize: number = 5;
  theTotalElements: number = 0;
  cartProductList: CartProduct[] = [];
  mySubscription;

  constructor(private cartService: CartService)
  {
  }

  ngOnInit()
  {
    this.getCartProducts();
  }

  getCartProducts()
  {
    const getURL = `http://localhost:8080/api/shopping-carts`;

    this.cartService.httpClient.get<GetResponseShoppingCartProducts>(getURL).subscribe(data =>
    {
      this.cartProductList = data._embedded.shoppingCarts;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      console.log(`number of items in cart = ${this.cartProductList.length}`);

        // calculate cart parameters (quantity and total cost)
      this.cartService.getCartDetailsProcessed(); 
    });
  }

  async deleteFromCart(cartProduct: CartProduct)
  {
    try
    {
      const firstActionPositiveResponse = await this.cartService.deleteFromCart(cartProduct.id);
      const secondActionPositiveResponse = await this.getCartProducts();
      window.location.reload();
    }
    catch(error) // if any promise is unfulfilled, the argument to reject() in that promise gets passed to catch()
    {
        console.log(error);
    }
  }
}

// structure of shopping cart data
interface GetResponseShoppingCartProducts
{
  _embedded:
  {
    shoppingCarts: CartProduct[];
  },
  // response metadata
  page: 
  {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
=======
export class CartDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d

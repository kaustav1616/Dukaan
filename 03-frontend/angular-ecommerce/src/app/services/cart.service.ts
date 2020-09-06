import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, Observable } from 'rxjs';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService
{
  cartItems: CartItem[] = [];
  cartProductList: Product[] = [];
  thePageNumber: number = 1; // initialized with 1 because when component is loaded for first time, it displays page 1 of category 1
  thePageSize: number = 5;
  theTotalElements: number = 0;

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  postData = {};

  constructor(private httpClient: HttpClient)
  {
  }

  /*
  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }
   */

  // POST request for add product to cart
  addToCart(product: Product)
  {
    const cartUrl = `http://localhost:8080/addToCart/${product.id}`;

    this.httpClient.post(cartUrl, this.postData).toPromise().then(data =>
    {
      console.log(data);
    })

    this.getCartDetailsProcessed();
  }

  // process the cart data received from backend
  getCartDetailsProcessed()
  {
    this.getCartDetails().subscribe(this.processResult());
    // this.getCartDetails().subscribe();
    // console.log(`List of cart products: ${this.cartProductList.length}`);

    let duplicateCartItem: CartItem = null;
    let newCartItem: CartItem = null;

    // create array of CartItem[] objects
    this.cartItems = [];

    for(let cartProduct of this.cartProductList)
    {
      console.log(`name = ${cartProduct.name}`);
      if(this.cartItems.length > 0)
        duplicateCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == cartProduct.id);

      if(duplicateCartItem != null)
        ++duplicateCartItem.quantity;
      else
      {
        newCartItem = new CartItem(cartProduct);
        this.cartItems.push(newCartItem);
      }
    }

    this.computeCartTotals();
  }

  // GET request for fetch cart products
  getCartDetails(): Observable<GetResponseShoppingCartProducts>
  {
    const cartUrl = `http://localhost:8080/api/shopping-carts`;

    return this.httpClient.get<GetResponseShoppingCartProducts>(cartUrl);
  }

  // process the result written by the backend API
  processResult()
  {
    return data =>
    {
      this.cartProductList = data._embedded.shoppingCarts;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  computeCartTotals()
  {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems)
    {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number)
  {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems)
    {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }
}

interface GetResponseProducts
{
  _embedded: {
    products: Product[];
  },
  // response metadata
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseShoppingCartProducts
{
  _embedded: {
    shoppingCarts: Product[];
  },
  // response metadata
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}